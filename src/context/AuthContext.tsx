import React, { createContext, useContext, useState, useEffect } from 'react';

const AUTHORIZED_EMAIL = 'birekeidea@gmail.com';
const AUTHORIZED_PASSWORD = 'b012000b';
const STORAGE_KEY_AUTH = 'bireke_auth_session_v1';
const STORAGE_KEY_LOGS = 'bireke_unauthorized_attempts_v1';

export interface SecurityAttemptLog {
  id: string;
  email: string;
  date: string;
  status: 'rejected';
  reason: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (email: string, pass: string) => { success: boolean; error?: string; reason?: string };
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (pendingAction?: () => void) => void;
  closeAuthModal: () => void;
  requireAuth: (action: () => void) => void;
  unauthorizedLogs: SecurityAttemptLog[];
  clearLogs: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
  login: () => ({ success: false }),
  logout: () => {},
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  requireAuth: () => {},
  unauthorizedLogs: [],
  clearLogs: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true' ? AUTHORIZED_EMAIL : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const [unauthorizedLogs, setUnauthorizedLogs] = useState<SecurityAttemptLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === AUTHORIZED_EMAIL.toLowerCase() && cleanPass === AUTHORIZED_PASSWORD) {
      setIsAuthenticated(true);
      setCurrentUser(AUTHORIZED_EMAIL);
      try {
        sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
      } catch (e) {
        console.warn('SessionStorage error:', e);
      }

      setIsAuthModalOpen(false);

      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }

      return { success: true };
    }

    // Invalid attempt - Log incident and notify
    const now = new Date();
    const newLog: SecurityAttemptLog = {
      id: `attempt-${Date.now()}`,
      email: cleanEmail || 'Email non renseigné',
      date: now.toLocaleString('fr-FR'),
      status: 'rejected',
      reason: 'Identifiants invalides — Inéligible à la publication'
    };

    setUnauthorizedLogs(prev => {
      const updated = [newLog, ...prev.slice(0, 19)];
      try {
        localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }
      return updated;
    });

    return {
      success: false,
      error: "Accès refusé : vous n'êtes pas éligible pour publier sur ce compte.",
      reason: `Une notification automatique d'inéligibilité a été générée pour ${cleanEmail || 'cet utilisateur'}. Seul l'administrateur (${AUTHORIZED_EMAIL}) dispose des droits de publication.`
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
    } catch (e) {
      console.warn('SessionStorage error:', e);
    }
  };

  const openAuthModal = (action?: () => void) => {
    if (action) {
      setPendingAction(() => action);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  };

  const requireAuth = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      openAuthModal(action);
    }
  };

  const clearLogs = () => {
    setUnauthorizedLogs([]);
    try {
      localStorage.removeItem(STORAGE_KEY_LOGS);
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        unauthorizedLogs,
        clearLogs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Mail, Key, Eye, EyeOff, X, AlertTriangle, Send, LogOut, CheckCircle2, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  triggerToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ triggerToast }) => {
  const {
    isAuthenticated,
    currentUser,
    login,
    logout,
    isAuthModalOpen,
    closeAuthModal,
    unauthorizedLogs,
    clearLogs
  } = useAuth();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<{ message: string; reason: string; attemptedEmail: string } | null>(null);
  const [showLogs, setShowLogs] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const result = login(emailInput, passwordInput);

    if (result.success) {
      triggerToast('Authentification réussie ! Accès éditeur accordé.');
      setEmailInput('');
      setPasswordInput('');
      setAuthError(null);
    } else {
      setAuthError({
        message: result.error || "Accès refusé : vous n'êtes pas éligible pour publier sur ce compte.",
        reason: result.reason || "Vos identifiants ne sont pas autorisés.",
        attemptedEmail: emailInput.trim()
      });
      triggerToast("Accès refusé : vous n'êtes pas éligible.");
    }
  };

  const sendRejectionEmail = () => {
    if (!authError?.attemptedEmail) return;

    const subject = encodeURIComponent("Refus d'accès : Inéligibilité de publication sur le portfolio de Bireke Idea");
    const body = encodeURIComponent(
      `Bonjour,\n\nVous avez tenté d'ajouter ou de modifier du contenu sur le portfolio officiel de Bireke Bashige Idea (Université Catholique de Bukavu - UCB).\n\nNous vous informons formellement que vous n'êtes pas éligible pour publier sur ce compte. Seul le titulaire officiel (birekeidea@gmail.com) détient les droits d'administration et de publication sur cette plateforme.\n\nCette tentative d'accès non autorisée a été journalisée.\n\nCordialement,\nService de Sécurité & Droits d'Auteur — Portfolio Bireke Bashige Idea`
    );

    window.location.href = `mailto:${authError.attemptedEmail}?subject=${subject}&body=${body}`;
    triggerToast(`Courriel d'inéligibilité généré pour ${authError.attemptedEmail}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-[#27272A] text-[#111827] dark:text-[#F4F4F5] border border-[#D1D5DB] dark:border-[#3F3F46] rounded-xl max-w-md w-full overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D1D5DB] dark:border-[#3F3F46] flex items-center justify-between bg-[#F4F4F5] dark:bg-[#18181B]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#8B4513] text-white">
              {isAuthenticated ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold uppercase text-sm sm:text-base tracking-wide text-[#111827] dark:text-[#F4F4F5]">
                {isAuthenticated ? 'Session Propriétaire Active' : 'Contrôle des Publications'}
              </h3>
              <p className="text-[11px] text-gray-700 dark:text-gray-300 font-medium">
                {isAuthenticated ? 'Droits d\'édition accordés' : 'Accès strictement restreint'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          
          {isAuthenticated ? (
            /* Mode Connecté */
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Connecté en tant que Propriétaire</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Vous êtes identifié avec <strong>{currentUser}</strong>. Vous pouvez ajouter et modifier des projets, photos et informations en toute liberté.
                </p>
              </div>

              {/* Journal des tentatives de fraude / intrus */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowLogs(!showLogs)}
                    className="font-bold text-xs uppercase text-[#8B4513] inline-flex items-center gap-1.5 cursor-pointer hover:underline"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Journal de sécurité ({unauthorizedLogs.length} tentative{unauthorizedLogs.length > 1 ? 's' : ''})</span>
                  </button>
                  {unauthorizedLogs.length > 0 && (
                    <button
                      onClick={clearLogs}
                      className="text-[10px] text-gray-500 hover:text-red-600 uppercase cursor-pointer"
                    >
                      Effacer
                    </button>
                  )}
                </div>

                {showLogs && (
                  <div className="max-h-40 overflow-y-auto space-y-1.5 pt-1 text-[11px]">
                    {unauthorizedLogs.length === 0 ? (
                      <p className="text-gray-500 italic">Aucune tentative non autorisée enregistrée.</p>
                    ) : (
                      unauthorizedLogs.map(log => (
                        <div key={log.id} className="p-2 rounded bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 flex flex-col gap-0.5">
                          <div className="flex justify-between font-bold">
                            <span className="truncate">{log.email}</span>
                            <span className="text-[10px] text-gray-500">{log.date}</span>
                          </div>
                          <span className="text-[10px] text-red-700 dark:text-red-300">{log.reason}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Se déconnecter</span>
                </button>

                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="px-4 py-2 bg-[#8B4513] hover:bg-[#70360F] text-white rounded-lg text-xs font-bold uppercase cursor-pointer"
                >
                  Continuer
                </button>
              </div>
            </div>
          ) : (
            /* Mode Non-Connecté : Formulaire d'authentification */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Accès Réservé au Propriétaire</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Aucune autre personne ne peut publier ou modifier ce portfolio. Veuillez renseigner les identifiants officiels pour continuer.
                </p>
              </div>

              {/* Erreur de non-éligibilité et rejet */}
              {authError && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border-2 border-red-500 rounded-lg text-xs text-red-900 dark:text-red-200 space-y-2 animate-in fade-in duration-200">
                  <div className="font-bold flex items-center gap-1.5 uppercase text-red-700 dark:text-red-300 text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{authError.message}</span>
                  </div>
                  <p className="text-xs text-red-800 dark:text-red-200 leading-relaxed">
                    {authError.reason}
                  </p>

                  {authError.attemptedEmail && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={sendRejectionEmail}
                        className="w-full py-2 px-3 bg-red-700 hover:bg-red-800 text-white rounded font-bold uppercase text-[11px] inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Notifier l'inéligibilité par e-mail ({authError.attemptedEmail})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Champ E-mail */}
              <div className="space-y-1 text-xs">
                <label className="block font-bold uppercase text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>Adresse e-mail autorisée *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="birekeidea@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#8B4513] text-xs font-sans"
                />
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-1 text-xs">
                <label className="block font-bold uppercase text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>Mot de passe *</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#8B4513] text-xs font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-white cursor-pointer"
                    aria-label="Afficher ou masquer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Bouton de validation */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold uppercase cursor-pointer"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-[#8B4513] hover:bg-[#70360F] text-white rounded-lg text-xs font-bold uppercase shadow-xs cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Vérifier & Publier</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

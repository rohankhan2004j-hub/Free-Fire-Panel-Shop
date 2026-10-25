import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  FileCode,
  FolderOpen,
  AlertTriangle,
  HardDrive,
  LogOut,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { googleSignIn, getAccessToken, logout, initAuth } from '../services/googleAuth';
import {
  listDriveFiles,
  uploadFileToDrive,
  deleteDriveFile,
  DriveFileItem,
} from '../services/googleDriveService';

interface GoogleDriveManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleDriveManagerModal: React.FC<GoogleDriveManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mandatory deletion confirmation state
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setIsLoadingAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsLoadingAuth(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch files when token is available
  useEffect(() => {
    if (isOpen && token) {
      loadFiles(token);
    }
  }, [isOpen, token]);

  const loadFiles = async (authToken: string) => {
    setIsLoadingFiles(true);
    setErrorMsg('');
    try {
      const data = await listDriveFiles(authToken);
      setFiles(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'ফাইল লোড করতে সমস্যা হয়েছে');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMsg('');
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        loadFiles(result.accessToken);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'গুগল সাইন-ইন সম্পন্ন করা সম্ভব হয়নি');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setFiles([]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsUploading(true);
    setErrorMsg('');
    try {
      const uploaded = await uploadFileToDrive(token, file);
      setFiles((prev) => [uploaded, ...prev]);
    } catch (err: any) {
      setErrorMsg(err.message || 'ফাইল আপলোড ব্যর্থ হয়েছে');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyLink = (file: DriveFileItem) => {
    const link = file.webViewLink || file.webContentLink || `https://drive.google.com/file/d/${file.id}/view`;
    navigator.clipboard.writeText(link);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // User Confirmation Execution for Destructive Operation
  const executeDelete = async () => {
    if (!fileToDelete || !token) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      setFiles((prev) => prev.filter((f) => f.id !== fileToDelete.id));
      setFileToDelete(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'ফাইল ডিলিট করা যায়নি');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return 'অজানা সাইজ';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return 'ফাইল';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-emerald-600 to-yellow-500 p-0.5 flex items-center justify-center shadow">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-blue-400">
                <HardDrive className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>Google Drive প্যানেল ফাইল ম্যানেজার</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  WORKSPACE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                আপনার গুগল ড্রাইভে প্যানেল APK, কনফিগ ও রেজিডিট ফাইল আপলোড ও পরিচালনা করুন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth State & Body */}
        <div className="py-5">
          {!user ? (
            /* Sign in with Google view */
            <div className="text-center py-8 px-4 bg-slate-950/70 border border-slate-800 rounded-xl max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                গুগল ড্রাইভ কানেক্ট করুন
              </h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                আপনার প্যানেল ও বাইপাস ফাইলগুলো কাস্টমারদের সাথে সুরক্ষিতভাবে শেয়ার করতে এবং ড্রাইভ ফাইল ব্রাউজ করতে সাইন-ইন করুন।
              </p>

              {/* Official Google GSI Button styling */}
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-800 font-bold py-2.5 px-5 rounded-lg shadow-md transition-all active:scale-98 disabled:opacity-50 text-sm border border-slate-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                <span>{isLoggingIn ? 'কানেক্ট হচ্ছে...' : 'Sign in with Google'}</span>
              </button>
            </div>
          ) : (
            /* Logged in File Explorer */
            <div>
              {/* Account Bar & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl mb-4 text-xs">
                <div className="flex items-center gap-2.5">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-slate-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-white block leading-tight">
                      {user.displayName || user.email}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors shadow active:scale-95 disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'আপলোড হচ্ছে...' : 'নতুন ফাইল আপলোড'}</span>
                  </button>

                  <button
                    onClick={() => token && loadFiles(token)}
                    disabled={isLoadingFiles}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="রিফ্রেশ করুন"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 p-2 rounded-lg bg-red-950/50 hover:bg-red-950 text-red-300 border border-red-500/30 transition-colors"
                    title="সাইন আউট"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Error Notification */}
              {errorMsg && (
                <div className="p-3 bg-red-950/70 border border-red-500/40 text-red-300 text-xs rounded-xl mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Files Table / List */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/80 max-h-80 overflow-y-auto">
                {isLoadingFiles ? (
                  <div className="text-center py-10 text-xs text-slate-400 flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                    <span>গুগল ড্রাইভের ফাইল লোড হচ্ছে...</span>
                  </div>
                ) : files.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-400">
                    <FolderOpen className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                    <p>কোনো ফাইল পাওয়া যায়নি। আপনার প্রথম প্যানেল APK আপলোড করুন!</p>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">ফাইলের নাম</th>
                        <th className="py-2.5 px-3 font-semibold">সাইজ</th>
                        <th className="py-2.5 px-3 font-semibold text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {files.map((file) => (
                        <tr key={file.id} className="hover:bg-slate-900/60 transition-colors group">
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span className="font-semibold text-slate-200 truncate max-w-xs block">
                                {file.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Copy Direct Link */}
                              <button
                                onClick={() => handleCopyLink(file)}
                                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                title="ডাউনলোড লিংক কপি করুন"
                              >
                                {copiedId === file.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>

                              {/* Open in Drive */}
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                                  title="গুগল ড্রাইভে দেখুন"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {/* Delete button (triggers confirmation dialog) */}
                              <button
                                onClick={() => setFileToDelete(file)}
                                className="p-1.5 rounded bg-red-950/40 hover:bg-red-900 text-red-400 transition-colors"
                                title="ফাইল মুছুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Google Drive v3 API Integration</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog for Destructive Delete Operation */}
      {fileToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-red-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-3 text-red-400">
              <div className="p-2 bg-red-950/80 border border-red-500/40 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                ফাইলটি কি সত্যিই মুছে ফেলতে চান?
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              আপনি আপনার গুগল ড্রাইভ থেকে <span className="font-bold text-white font-mono">"{fileToDelete.name}"</span> ফাইলটি পার্মানেন্টলি ডিলিট করতে যাচ্ছেন। এটি কাস্টমারদের ডাউনলোড লিংকে প্রভাব ফেলতে পারে।
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg bg-slate-800 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={executeDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-red-600 hover:bg-red-500 transition-colors shadow disabled:opacity-50"
              >
                {isDeleting ? 'ডিলিট হচ্ছে...' : 'হ্যাঁ, ডিলিট করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

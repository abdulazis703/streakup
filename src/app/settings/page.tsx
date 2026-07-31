'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { useAppData } from '@/lib/context/AppDataContext';
import { useSettings } from '@/lib/context/SettingsContext';

export default function SettingsPage() {
  const { user, profile, signOut, stats } = useAppData();
  const { theme, setTheme, language, setLanguage, t } = useSettings();
  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('07:00');
  const [saved, setSaved] = useState(false);

  const userName = profile?.full_name ?? user?.email?.split('@')[0] ?? 'Pengguna';

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-all ${value ? 'bg-primary' : 'bg-surface-container-highest'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? 'left-7' : 'left-1'}`} />
    </button>
  );

  return (
    <AppLayout>
      <div className="px-md lg:px-xl py-lg max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-display font-display text-on-surface">{t('settings.title')}</h1>
          <p className="text-body-lg text-on-surface-variant">{t('settings.subtitle')}</p>
        </div>

        {/* Account Info */}
        <div className="glass-card rounded-[2rem] p-xl mb-lg hover:shadow-md hover:bg-white/80 transition-all duration-300">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">{t('settings.account')}</h2>
          <div className="flex items-center gap-lg mb-lg">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <span className="text-on-primary font-bold text-[20px]">
                {userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-bold text-on-surface text-body-lg">{userName}</p>
              <p className="text-body-md text-on-surface-variant">{user?.email}</p>
              <div className="flex gap-sm mt-xs flex-wrap">
                <span className="text-label-sm bg-primary-fixed text-on-primary-fixed px-sm py-xs rounded-full font-bold">
                  🔥 {stats.currentStreak} {t('settings.streakDays')}
                </span>
                <span className="text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-sm py-xs rounded-full font-bold">
                  ✓ {stats.totalHabits} {t('settings.activeHabits')}
                </span>
              </div>
            </div>
          </div>
          <button className="w-full py-sm rounded-2xl border-2 border-outline-variant/30 text-on-surface-variant font-bold text-body-md hover:bg-surface-container-low transition-all flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            {t('settings.editProfile')}
          </button>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-[2rem] p-xl mb-lg hover:shadow-md hover:bg-white/80 transition-all duration-300">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">{t('settings.notificationsTitle')}</h2>
          <div className="space-y-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-on-surface text-body-md">{t('settings.dailyReminder')}</p>
                <p className="text-label-sm text-on-surface-variant">{t('settings.dailyReminderDesc')}</p>
              </div>
              <ToggleSwitch value={notifications} onChange={setNotifications} />
            </div>
            {notifications && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface text-body-md">{t('settings.reminderTime')}</p>
                  <p className="text-label-sm text-on-surface-variant">{t('settings.reminderTimeDesc')}</p>
                </div>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-xl px-md py-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            )}
          </div>
        </div>

        {/* Appearance / Language */}
        <div className="glass-card rounded-[2rem] p-xl mb-lg hover:shadow-md hover:bg-white/80 transition-all duration-300">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">{t('settings.appearance')}</h2>
          <div className="space-y-lg">
            <div>
              <p className="font-bold text-on-surface text-body-md mb-sm">{t('settings.language')}</p>
              <div className="grid grid-cols-2 gap-sm">
                {[
                  { value: 'id', label: '🇮🇩 Bahasa Indonesia' },
                  { value: 'en', label: '🇺🇸 English' },
                ].map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLanguage(l.value as 'id'|'en')}
                    className={`p-md rounded-2xl text-body-md font-bold transition-all border-2 ${
                      language === l.value ? 'border-primary bg-primary-fixed/20 text-primary' : 'border-transparent bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App info */}
        <div className="glass-card rounded-[2rem] p-xl mb-lg hover:shadow-md hover:bg-white/80 transition-all duration-300">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">{t('settings.aboutApp')}</h2>
          <div className="space-y-sm">
            {[
              { label: t('settings.version'), value: '1.0.0' },
              { label: t('settings.totalActiveHabits'), value: `${stats.totalHabits}` },
              { label: t('settings.totalCheckins'), value: `${stats.totalCheckIns}x` },
              { label: t('settings.longestStreak'), value: `${stats.longestStreak} hari` },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-sm border-b border-outline-variant/10 last:border-0">
                <span className="text-body-md text-on-surface-variant">{item.label}</span>
                <span className="text-body-md font-bold text-on-surface">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-md bg-primary text-on-primary rounded-2xl font-bold text-body-md flex items-center justify-center gap-sm shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all mb-md"
        >
          {saved ? (
            <><span className="material-symbols-outlined">check_circle</span> {t('settings.savedBtn')}</>
          ) : (
            <><span className="material-symbols-outlined">save</span> {t('settings.saveBtn')}</>
          )}
        </button>

        {/* Sign Out */}
        <button
          onClick={signOut}
          className="w-full py-md bg-error/10 text-error border-2 border-error/20 rounded-2xl font-bold text-body-md flex items-center justify-center gap-sm hover:bg-error/20 transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
          {t('settings.logoutBtn')}
        </button>
      </div>
    </AppLayout>
  );
}

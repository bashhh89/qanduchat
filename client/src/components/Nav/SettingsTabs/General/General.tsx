import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import React, { useContext, useCallback } from 'react';
import UserMsgMarkdownSwitch from './UserMsgMarkdownSwitch';
import HideSidePanelSwitch from './HideSidePanelSwitch';
import { ThemeContext, useLocalize } from '~/hooks';
import AutoScrollSwitch from './AutoScrollSwitch';
import ArchivedChats from './ArchivedChats';
import { Dropdown } from '~/components/ui';
import store from '~/store';

export const ThemeSelector = ({
  theme,
  onChange,
}: {
  theme: string;
  onChange: (value: string) => void;
}) => {
  const localize = useLocalize();

  const themeOptions = [
    { value: 'system', label: localize('com_nav_theme_system') },
    { value: 'dark', label: localize('com_nav_theme_dark') },
    { value: 'light', label: localize('com_nav_theme_light') },
  ];

  return (
    <div className="flex items-center justify-between">
      <div>{localize('com_nav_theme')}</div>

      <Dropdown
        value={theme}
        onChange={onChange}
        options={themeOptions}
        sizeClasses="w-[180px]"
        testId="theme-selector"
      />
    </div>
  );
};

export const LangSelector = ({
  langcode,
  onChange,
}: {
  langcode: string;
  onChange: (value: string) => void;
}) => {
  const localize = useLocalize();

  // Hardcoded language options - ONLY English and Arabic
  return (
    <div className="flex items-center justify-between">
      <div>{localize('com_nav_language')}</div>

      <select 
        value={langcode}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 rounded-md border border-border-light bg-transparent p-0 pl-2 pr-8 text-sm text-text-primary transition-colors hover:bg-surface-tertiary"
        data-testid="language-selector"
      >
        <option value="auto">Auto detect</option>
        <option value="en-US">English</option>
        <option value="ar-EG">العربية</option>
      </select>
    </div>
  );
};

function General() {
  const { theme, setTheme } = useContext(ThemeContext);

  const [langcode, setLangcode] = useRecoilState(store.lang);

  const changeTheme = useCallback(
    (value: string) => {
      setTheme(value);
    },
    [setTheme],
  );

  const changeLang = useCallback(
    (value: string) => {
      let userLang = value;
      if (value === 'auto') {
        userLang = navigator.language || navigator.languages[0];
      }

      requestAnimationFrame(() => {
        document.documentElement.lang = userLang;
      });
      setLangcode(userLang);
      Cookies.set('lang', userLang, { expires: 365 });
    },
    [setLangcode],
  );

  return (
    <div className="flex flex-col gap-3 p-1 text-sm text-text-primary">
      <div className="pb-3">
        <ThemeSelector theme={theme} onChange={changeTheme} />
      </div>
      <div className="pb-3">
        <LangSelector langcode={langcode} onChange={changeLang} />
      </div>
      <div className="pb-3">
        <UserMsgMarkdownSwitch />
      </div>
      <div className="pb-3">
        <AutoScrollSwitch />
      </div>
      <div className="pb-3">
        <HideSidePanelSwitch />
      </div>
      <div className="pb-3">
        <ArchivedChats />
      </div>
    </div>
  );
}

export default React.memo(General);

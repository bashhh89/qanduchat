import { useRecoilState } from 'recoil';
import { Dropdown } from '~/components/ui';
import { useLocalize } from '~/hooks';
import store from '~/store';

export default function LanguageSTTDropdown() {
  const localize = useLocalize();
  const [languageSTT, setLanguageSTT] = useRecoilState<string>(store.languageSTT);

  const languageOptions = [
    { value: 'ar-EG', label: 'Arabic (Egypt)' },
    { value: 'ar-JO', label: 'Arabic (Jordan)' },
    { value: 'ar-KW', label: 'Arabic (Kuwait)' },
    { value: 'ar-LB', label: 'Arabic (Lebanon)' },
    { value: 'ar-QA', label: 'Arabic (Qatar)' },
    { value: 'ar-AE', label: 'Arabic (UAE)' },
    { value: 'ar-MA', label: 'Arabic (Morocco)' },
    { value: 'ar-IQ', label: 'Arabic (Iraq)' },
    { value: 'ar-DZ', label: 'Arabic (Algeria)' },
    { value: 'ar-BH', label: 'Arabic (Bahrain)' },
    { value: 'ar-LY', label: 'Arabic (Libya)' },
    { value: 'ar-OM', label: 'Arabic (Oman)' },
    { value: 'ar-SA', label: 'Arabic (Saudi Arabia)' },
    { value: 'ar-TN', label: 'Arabic (Tunisia)' },
    { value: 'ar-YE', label: 'Arabic (Yemen)' },
    { value: 'en-AU', label: 'English (Australia)' },
    { value: 'en-CA', label: 'English (Canada)' },
    { value: 'en-IN', label: 'English (India)' },
    { value: 'en-NZ', label: 'English (New Zealand)' },
    { value: 'en-ZA', label: 'English (South Africa)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'en-US', label: 'English (US)' },
  ];

  const handleSelect = (value: string) => {
    setLanguageSTT(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div>{localize('com_nav_language')}</div>
      <Dropdown
        value={languageSTT}
        onChange={handleSelect}
        options={languageOptions}
        sizeClasses="[--anchor-max-height:256px]"
        anchor="bottom start"
        testId="LanguageSTTDropdown"
      />
    </div>
  );
}

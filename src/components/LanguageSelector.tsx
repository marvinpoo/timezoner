import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown } from 'lucide-react';

const languageNames: Record<string, { native: string, english: string }> = {
  // Metrolekt Languages
  ber: { native: 'Berlinerisch (Köpenick) 𓆟', english: 'Berlin German (Köpenick) 𓆟' },

  // North American Languages
  'en-US': { native: 'English (US)', english: 'English (US)' },
  'en-CA': { native: 'English (Canada)', english: 'English (Canada)' },
  'fr-CA': { native: 'Français (Canada)', english: 'French (Canada)' },
  'es-MX': { native: 'Español (México)', english: 'Spanish (Mexico)' },
  nv: { native: 'Diné bizaad', english: 'Navajo' },
  
  // EU Languages
  en: { native: 'English', english: 'English' },
  de: { native: 'Deutsch', english: 'German' },
  fr: { native: 'Français', english: 'French' },
  es: { native: 'Español', english: 'Spanish' },
  it: { native: 'Italiano', english: 'Italian' },
  pl: { native: 'Polski', english: 'Polish' },
  nl: { native: 'Nederlands', english: 'Dutch' },
  pt: { native: 'Português', english: 'Portuguese' },
  fi: { native: 'Suomi', english: 'Finnish' },
  sv: { native: 'Svenska', english: 'Swedish' },
  da: { native: 'Dansk', english: 'Danish' },
  el: { native: 'Ελληνικά', english: 'Greek' },
  hu: { native: 'Magyar', english: 'Hungarian' },
  cs: { native: 'Čeština', english: 'Czech' },
  sk: { native: 'Slovenčina', english: 'Slovak' },
  ro: { native: 'Română', english: 'Romanian' },
  bg: { native: 'Български', english: 'Bulgarian' },
  hr: { native: 'Hrvatski', english: 'Croatian' },
  sl: { native: 'Slovenščina', english: 'Slovenian' },
  et: { native: 'Eesti', english: 'Estonian' },
  lt: { native: 'Lietuvių', english: 'Lithuanian' },
  lv: { native: 'Latviešu', english: 'Latvian' },
  mt: { native: 'Malti', english: 'Maltese' },
  
  // Non-EU European Languages
  ru: { native: 'Русский', english: 'Russian' },
  uk: { native: 'Українська', english: 'Ukrainian' },
  be: { native: 'Беларуская', english: 'Belarusian' },
  sr: { native: 'Српски', english: 'Serbian' },
  bs: { native: 'Bosanski', english: 'Bosnian' },
  mk: { native: 'Македонски', english: 'Macedonian' },
  sq: { native: 'Shqip', english: 'Albanian' },
  no: { native: 'Norsk', english: 'Norwegian' },
  is: { native: 'Íslenska', english: 'Icelandic' },
  
  // Asian Languages
  zh: { native: '中文', english: 'Chinese' },
  ja: { native: '日本語', english: 'Japanese' },
  ko: { native: '한국어', english: 'Korean' },
  vi: { native: 'Tiếng Việt', english: 'Vietnamese' },
  th: { native: 'ไทย', english: 'Thai' },
  hi: { native: 'हिन्दी', english: 'Hindi' },
  bn: { native: 'বাংলা', english: 'Bengali' },
  id: { native: 'Bahasa Indonesia', english: 'Indonesian' },
  ms: { native: 'Bahasa Melayu', english: 'Malay' },
  ar: { native: 'العربية', english: 'Arabic' },
  fa: { native: 'فارسی', english: 'Persian' },

  // South American Languages and Variations
  'es-AR': { native: 'Español (Argentina)', english: 'Spanish (Argentina)' },
  'es-CL': { native: 'Español (Chile)', english: 'Spanish (Chile)' },
  'es-CO': { native: 'Español (Colombia)', english: 'Spanish (Colombia)' },
  'es-PE': { native: 'Español (Perú)', english: 'Spanish (Peru)' },
  'pt-BR': { native: 'Português (Brasil)', english: 'Portuguese (Brazil)' },
  qu: { native: 'Runasimi', english: 'Quechua' },
  ay: { native: 'Aymar aru', english: 'Aymara' },

  // African Languages
  sw: { native: 'Kiswahili', english: 'Swahili' },
  am: { native: 'አማርኛ', english: 'Amharic' },
  zu: { native: 'isiZulu', english: 'Zulu' },

  // Indigenous Languages
  iu: { native: 'ᐃᓄᒃᑎᑐᑦ', english: 'Inuktitut' }
};

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languageNames[i18n.language] || languageNames.en;

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setIsOpen(false);
  };

  const isMetrolektLanguage = (code: string) =>
    ['ber'].includes(code);

  const isNorthAmericanLanguage = (code: string) =>
    ['en-US', 'en-CA', 'fr-CA', 'es-MX', 'nv'].includes(code);

  const isAsianLanguage = (code: string) => 
    ['zh', 'ja', 'ko', 'vi', 'th', 'hi', 'bn', 'id', 'ms', 'ar', 'fa'].includes(code);

  const isSouthAmericanLanguage = (code: string) =>
    ['es-AR', 'es-CL', 'es-CO', 'es-PE', 'pt-BR', 'qu', 'ay'].includes(code);

  const isAfricanLanguage = (code: string) =>
    ['sw', 'am', 'zu'].includes(code);

  const isIndigenousLanguage = (code: string) =>
    ['iu', 'nv', 'qu', 'ay'].includes(code);

  const isEuropeanLanguage = (code: string) =>
    !isMetrolektLanguage(code) && !isNorthAmericanLanguage(code) && 
    !isAsianLanguage(code) && !isSouthAmericanLanguage(code) && 
    !isAfricanLanguage(code) && !isIndigenousLanguage(code);

  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages size={18} />
        <span>{currentLanguage.native}</span>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="language-group">
            <div className="group-label">Metrolekt</div>
            {Object.entries(languageNames)
              .filter(([code]) => isMetrolektLanguage(code))
              .map(([code, names]) => (
                <button
                  key={code}
                  className={`language-option ${i18n.language === code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <span className="native-name">{names.native}</span>
                  <span className="english-name">{names.english}</span>
                </button>
              ))}
          </div>
          <div className="language-group">
            <div className="group-label">North American</div>
            {Object.entries(languageNames)
              .filter(([code]) => isNorthAmericanLanguage(code))
              .map(([code, names]) => (
                <button
                  key={code}
                  className={`language-option ${i18n.language === code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <span className="native-name">{names.native}</span>
                  <span className="english-name">{names.english}</span>
                </button>
              ))}
          </div>
          <div className="language-group">
            <div className="group-label">European</div>
            {Object.entries(languageNames)
              .filter(([code]) => isEuropeanLanguage(code))
              .map(([code, names]) => (
                <button
                  key={code}
                  className={`language-option ${i18n.language === code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <span className="native-name">{names.native}</span>
                  <span className="english-name">{names.english}</span>
                </button>
              ))}
          </div>
          <div className="language-group">
            <div className="group-label">South American</div>
            {Object.entries(languageNames)
              .filter(([code]) => isSouthAmericanLanguage(code))
              .map(([code, names]) => (
                <button
                  key={code}
                  className={`language-option ${i18n.language === code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <span className="native-name">{names.native}</span>
                  <span className="english-name">{names.english}</span>
                </button>
              ))}
          </div>
          <div className="language-group">
            <div className="group-label">Asian</div>
            {Object.entries(languageNames)
              .filter(([code]) => isAsianLanguage(code))
              .map(([code, names]) => (
                <button
                  key={code}
                  className={`language-option ${i18n.language === code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <span className="native-name">{names.native}</span>
                  <span className="english-name">{names.english}</span>
                </button>
              ))}
          </div>
          <div className="language-group">
            <div className="group-label">African</div>
            {Object.entries(languageNames)
              .filter(([code]) => isAfricanLanguage(code))
              .map(([code, names]) => (
                <button
                  key={code}
                  className={`language-option ${i18n.language === code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <span className="native-name">{names.native}</span>
                  <span className="english-name">{names.english}</span>
                </button>
              ))}
          </div>
          <div className="language-group">
            <div className="group-label">Indigenous</div>
            {Object.entries(languageNames)
              .filter(([code]) => isIndigenousLanguage(code))
              .map(([code, names]) => (
                <button
                  key={code}
                  className={`language-option ${i18n.language === code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <span className="native-name">{names.native}</span>
                  <span className="english-name">{names.english}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
import fr from './fr.json';
import en from './en.json';

export type Locale = 'fr' | 'en';

export const translations = {
	fr,
	en
};

export function getTranslations(locale: Locale) {
	return translations[locale] || translations.fr;
}

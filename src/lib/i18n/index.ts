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

/**
 * Returns the translation for the given slug and locale.
 * The slug is a concatenation of the path to the translation ex. project.list.0.title
 * @param slug 
 * @param locale 
 * @returns 
 */
export function _t(slug: string, locale: Locale) {
	return findSlugInT(translations[locale], slug);
}

function findSlugInT(t: any, slug: string) {
	let here = t;
	try {
		for (const key of slug.split('.')) {
			here = here[key];
		}
		return here;
	} catch (error) {
		console.error(`Translation not found for slug: ${slug}`);
		return slug;
	}
}

import { MessageKeys, NestedKeyOf } from 'next-intl';

import de from '../../messages/de.json';

export type Messages = typeof de;
export type TranslationKey = MessageKeys<Messages, NestedKeyOf<Messages>>;

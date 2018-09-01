/*
 * Created on Sun Jun 03 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import I18n from 'react-native-i18n';

class I18nHelper {
    static t(prefix, scope, options) {
        prefix = prefix ? `${prefix}.` : '';
        let text = I18n.t(`${prefix}${scope}`, options);
        let regex = /\[missing.+translation\]/gim;
        // if missing translation return text of scope        
        if (regex.test(text)) {
            return scope;
        }
        return text;
    }
}

export default I18nHelper;

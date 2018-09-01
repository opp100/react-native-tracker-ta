/* 
 * Invoked from https://github.com/shyaniv7/react-native-fontawesome-pro
 * 
 */
import fontawesome from '@fortawesome/fontawesome';

import brands from '@fortawesome/fontawesome-free-brands';
// there are no light in free version, if you want using FA pro, please try 'react-native-fontawesome-pro'
// import light from '@fortawesome/fontawesome-pro-light'; 
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';

export const configureFontAwesomePro = (prefixType = 'regular') => {
    fontawesome.config = {
        familyPrefix: prefixTypes[prefixType]
    };

    fontawesome.library.add(brands, regular, solid);
};

export const prefixTypes = {
    regular: 'far',
    solid: 'fas',
    brands: 'fab'
};

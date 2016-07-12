import baseCss from '../../_scss/base.scss';
import productBox from '../../_components/productBox.js';

// var productBox = require('../../_components/productBox.js');
console.log(productBox)

$(productBox()).appendTo("#product-index");
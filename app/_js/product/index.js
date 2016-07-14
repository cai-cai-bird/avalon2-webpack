import baseCss from '../../_lib/base.scss';
import productBox from '../../_components/productBox.js';

// var productBox = require('../../_components/productBox.js');
console.log(productBox)

$(productBox()).appendTo("#product-index");
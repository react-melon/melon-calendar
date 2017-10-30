/**
 * @file 测试入口
 * @author leon <ludafa@outlook.com>
 */

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter: new Adapter()
});


const specContext = require.context('./components', true, /\.spec\.js$/)
const specs = specContext
    .keys()
    .forEach(specContext);

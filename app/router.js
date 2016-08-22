/**
 * Created by Huhy on 2016/8/22.
 */
import notFind from './components/404';
import count from './components/other/Count';
import test from './test/tableTest';

export default (router) => router.map(
	{
		'/': {
			component: {
				template: '<p>这是首页...</p>'
			}
		},
		'*': {
			component: notFind
		},
		'/count':{
			component: count
		},
		'/test':{
			component: test
		}
	}
);


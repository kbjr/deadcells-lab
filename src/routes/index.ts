
import { app } from '../app';

require('./app');
require('./home');
require('./routes');
require('./items');
require('./builds');

app.registerPage('home', { component: 'dc-page-home', subHeading: '' });
app.registerPage('routes', { component: 'dc-page-routes', subHeading: 'Routes' });
app.registerPage('items', { component: 'dc-page-items', subHeading: 'Items' });
app.registerPage('builds', { component: 'dc-page-builds', subHeading: 'Builds' });

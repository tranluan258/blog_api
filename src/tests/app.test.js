import encoding from 'mysql2/node_modules/iconv-lite';
encoding.encodingExists('foo');
import app from '../../index.js';
import categoryTest from './category.js';
import signInTest from './signin.js';
import postTest from './post.js';
import signUpTest from './signup.js';
import userPermissionTest from './user.permission.js'

signUpTest(app);
signInTest(app);
userPermissionTest(app)
categoryTest(app);
postTest(app);



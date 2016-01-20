var path = require('path'),
    os = require('os'),
    fs = require('fs'),
    stats,
    dir = os.homedir ? os.homedir() : (function() {
        return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    }());

/*
git remote add origin https://github.com/hollowdoor/penumbra_require.git
git push -u origin master
*/

try{
    fs.statSync(path.join(dir, '.penumbra_modules'))
}catch(e){
    try{
        fs.mkdirSync(path.join(dir, '.penumbra_modules'))
    }catch(e2){
        throw new Error('penumbra-require tried to create {HOME_DIR/.penumbra_modules}\n'+e2.message);
    }
}


module.exports = function(name){
    var file = path.join(dir, '.penumbra_modules', name);

    try{
        return require(file);
    }catch(e1){
        try{
            return require(name);
        }catch(e2){
            throw new Error(e1.message + e2.message);
        }
    }
};

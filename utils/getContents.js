const axios = require('axios');
const Iconv = require('iconv').Iconv
const Encoding = require('encoding-japanese')

module.exports = function getContents(url, { headers = {} } = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers,
            responseType: 'arraybuffer',
            transformResponse : [(data) => {
                const iconv = new Iconv(Encoding.detect(data), 'UTF-8//TRANSLIT//IGNORE')
                const converted = iconv.convert(data).toString()
                return converted
            }]
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    });
};

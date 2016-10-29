/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sitemap              ->  index
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _sitemap = require('sitemap');

var _sitemap2 = _interopRequireDefault(_sitemap);

var _posts = require('../posts/posts.model');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basicMap = {
  hostname: 'http://www.rogatis.eti.br',
  cacheTime: 600000, // 600 sec cache period
  urls: [{
    url: '/',
    changefreq: 'daily',
    priority: 0.3
  }, {
    url: '/porfolio',
    changefreq: 'monthly',
    priority: 0.7
  }, {
    url: '/blog',
    changefreq: 'daily',
    priority: 0.5
  }, {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7
  }]
};

function sitemap(res) {
  _posts2.default.find().exec().then(function (posts) {

    var map = _sitemap2.default.createSitemap(basicMap);
    posts.map(function (post) {
      map.add({ url: '/' + post.slug });
    });
    map.toXML(function (err, xml) {
      if (!err) {
        console.log(xml);
      }
    });
    console.log(map);
    return res.status(200).header('Content-Type', 'application/xml').send(map.toString());
  });
}

// Gets a site map
function index(req, res) {
  return sitemap(res);
}
//# sourceMappingURL=sitemap.controller.js.map

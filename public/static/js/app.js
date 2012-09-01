(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application;

  Application = {
    initialize: function(onSuccess) {
      var Router, utils;
      Router = require('lib/router');
      utils = require('lib/utils');
      this.views = {};
      this.router = new Router();
      Backbone.history.start({
        pushState: true
      });
      return onSuccess();
    }
  };

  module.exports = Application;
  
}});

window.require.define({"collections/battles": function(exports, require, module) {
  var Battle, Battles, Collection,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('./collection');

  Battle = require('../models/battle');

  Battles = (function(_super) {

    __extends(Battles, _super);

    function Battles() {
      this.initialize = __bind(this.initialize, this);
      return Battles.__super__.constructor.apply(this, arguments);
    }

    Battles.prototype.baseUrl = 'battle/';

    Battles.prototype.model = Battle;

    Battles.prototype.initialize = function() {
      return this.url = "" + this.baseUrl + this.battle;
    };

    return Battles;

  })(Collection);

  module.exports = Battles;
  
}});

window.require.define({"collections/collection": function(exports, require, module) {
  var Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Backbone.Collection);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  
  window.app = require('application');

  console.log('----starting up----');

  $(function() {
    var _this = this;
    return app.initialize(function() {
      return console.log('success');
    });
  });
  
}});

window.require.define({"lib/router": function(exports, require, module) {
  var IndexView, Router, app, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = require('application');

  utils = require('lib/utils');

  IndexView = require('views/index');

  module.exports = Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      this.index = __bind(this.index, this);
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '': 'index'
    };

    Router.prototype.index = function() {
      return this.indexView = new IndexView();
    };

    return Router;

  })(Backbone.Router);
  
}});

window.require.define({"lib/utils": function(exports, require, module) {
  
  module.exports = {};
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  
  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue && optionalValue.hash === void 0) {
      console.log("Value");
      console.log("====================");
      return console.log(optionalValue);
    }
  });
  
}});

window.require.define({"models/battle": function(exports, require, module) {
  var Battle, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('./model');

  Battle = (function(_super) {

    __extends(Battle, _super);

    function Battle() {
      return Battle.__super__.constructor.apply(this, arguments);
    }

    Battle.prototype.defaults = function() {
      return {
        name: 'Unknown',
        criteria: []
      };
    };

    return Battle;

  })(Model);

  module.exports = Battle;
  
}});

window.require.define({"models/model": function(exports, require, module) {
  var Backbone, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone = this.Backbone || require('../../vendor/scripts/backbone');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      this.close = __bind(this.close, this);
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.close = function() {
      this.unbind();
      return typeof this.onClose === "function" ? this.onClose() : void 0;
    };

    return Model;

  })(Backbone.Model);
  
}});

window.require.define({"views/404": function(exports, require, module) {
  var FourOhFourView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  FourOhFourView = (function(_super) {

    __extends(FourOhFourView, _super);

    function FourOhFourView() {
      this.initialize = __bind(this.initialize, this);
      return FourOhFourView.__super__.constructor.apply(this, arguments);
    }

    FourOhFourView.prototype.el = '.main-page';

    FourOhFourView.prototype.template = require('./templates/404');

    FourOhFourView.prototype.initialize = function() {
      return this.render();
    };

    return FourOhFourView;

  })(View);

  module.exports = FourOhFourView;
  
}});

window.require.define({"views/index": function(exports, require, module) {
  var IndexView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  IndexView = (function(_super) {

    __extends(IndexView, _super);

    function IndexView() {
      this.initialize = __bind(this.initialize, this);
      return IndexView.__super__.constructor.apply(this, arguments);
    }

    IndexView.prototype.el = '.main-page';

    IndexView.prototype.template = require('./templates/index');

    IndexView.prototype.initialize = function() {
      return this.render();
    };

    return IndexView;

  })(View);

  module.exports = IndexView;
  
}});

window.require.define({"views/templates/index": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"index-view\">Coming soon!</div>\n";});
}});

window.require.define({"views/view": function(exports, require, module) {
  var View, app, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = require('lib/utils');

  app = require('application');

  require('lib/view_helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      this.routeLink = __bind(this.routeLink, this);

      this.routeEvent = __bind(this.routeEvent, this);

      this.close = __bind(this.close, this);

      this.render = __bind(this.render, this);

      this.getInput = __bind(this.getInput, this);
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.views = {};

    View.prototype.template = function() {};

    View.prototype.getRenderData = function() {};

    View.prototype.getInput = function() {
      if (!this.$in) {
        this.$in = $(this["in"]);
      }
      return this.$in;
    };

    View.prototype.render = function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    };

    View.prototype.afterRender = function() {};

    View.prototype.close = function() {
      this.remove();
      this.unbind();
      return typeof this.onClose === "function" ? this.onClose() : void 0;
    };

    View.prototype.routeEvent = function(event) {
      var $link, url;
      $link = $(event.target);
      url = $link.attr('href');
      if ($link.attr('target') === '_blank' || typeof url === 'undefined' || url.substr(0, 4) === 'http' || url === '' || url === 'javascript:void(0)') {
        return true;
      }
      event.preventDefault();
      return this.routeLink(url);
    };

    View.prototype.routeLink = function(url) {
      return app.router.navigate(url, {
        trigger: true
      });
    };

    return View;

  })(Backbone.View);
  
}});


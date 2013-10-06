(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
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
      return globals.require(absolute);
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

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application;

  Application = {
    initialize: function(onSuccess) {
      var Router;
      Router = require('lib/router');
      this.views = {};
      this.router = new Router();
      Backbone.history.start({
        pushState: true
      });
      return typeof onSuccess === "function" ? onSuccess() : void 0;
    }
  };

  module.exports = Application;
  
});
window.require.register("collections/battles", function(exports, require, module) {
  var Battle, Battles, battlesData,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Battle = require('../models/battle');

  battlesData = require('../lib/battles_data');

  Battles = (function(_super) {

    __extends(Battles, _super);

    function Battles() {
      this.fetch = __bind(this.fetch, this);
      return Battles.__super__.constructor.apply(this, arguments);
    }

    Battles.prototype.model = Battle;

    Battles.prototype.fetch = function(options) {
      this.reset(this.parse(battlesData));
      options.success();
      return this;
    };

    return Battles;

  })(Backbone.Collection);

  module.exports = Battles;
  
});
window.require.register("initialize", function(exports, require, module) {
  
  window.app = require('application');

  $(function() {
    return app.initialize();
  });
  
});
window.require.register("lib/battles_data", function(exports, require, module) {
  
  module.exports = [
    {
      "name": "deep-dish-pizza",
      "description": "Jayeth and Basheus III take on their first challenge: who has the best deep dish pizza in Chicago? Can they figure it out without their hearts exploding? Stay tuned to find out.",
      "contenders": [
        {
          "name": "Lou Malnati's",
          "description": "Located on North Wells St, north of the loop",
          "criteria": [
            {
              "Crust": 8
            }, {
              "Cheese": 7
            }, {
              "Toppings": 8
            }, {
              "Sauce": 7
            }, {
              "Presentation": 7
            }, {
              "Beer Selection": 3
            }, {
              "Atmosphere": 9
            }, {
              "Price": 7
            }, {
              "Quality": 8
            }
          ],
          "pictures": ["http://distilleryimage7.s3.amazonaws.com/f97c6ed8f47911e1abe622000a1e9520_7.jpg", "http://distilleryimage4.s3.amazonaws.com/4114f3b4f47a11e1b9d422000a1e9f46_7.jpg", "http://distilleryimage4.s3.amazonaws.com/dbed450af46411e18ac522000a1c03e3_7.jpg", "http://distilleryimage8.s3.amazonaws.com/014f070ef46311e1ae7122000a1e8b9c_7.jpg"]
        }, {
          "name": "Giordano's",
          "description": "Located on West Jackson in the loop",
          "criteria": [
            {
              "Crust": 5
            }, {
              "Cheese": 8
            }, {
              "Toppings": 6
            }, {
              "Sauce": 4
            }, {
              "Presentation": 5
            }, {
              "Beer Selection": 4
            }, {
              "Atmosphere": 3
            }, {
              "Price": 6
            }, {
              "Quality": 6
            }
          ],
          "pictures": ["http://distilleryimage3.s3.amazonaws.com/107a032af47a11e19d0322000a1e9e62_7.jpg", "http://distilleryimage7.s3.amazonaws.com/599b45a8f47211e18a5b22000a1c864e_7.jpg", "http://distilleryimage1.s3.amazonaws.com/e6b397c4f47211e1890222000a1cfddf_7.jpg", "http://distilleryimage3.s3.amazonaws.com/897e567ef46e11e1abd6123138045d81_7.jpg"]
        }, {
          "name": "Original Gino's East",
          "description": "Located on North Lincoln and Diversey",
          "criteria": [
            {
              "Crust": 8
            }, {
              "Cheese": 8
            }, {
              "Toppings": 7
            }, {
              "Sauce": 8
            }, {
              "Presentation": 6
            }, {
              "Beer Selection": 1
            }, {
              "Atmosphere": 8
            }, {
              "Price": 8
            }, {
              "Quality": 7
            }
          ],
          "pictures": ["http://distilleryimage7.s3.amazonaws.com/9842f5b6f51d11e1959322000a1e9e0c_7.jpg", "http://distilleryimage2.s3.amazonaws.com/bfb05f96f52511e1b2c322000a1e9e1f_7.jpg", "http://distilleryimage4.s3.amazonaws.com/49310f34230e11e2b62722000a1fbc10_7.jpg"]
        }
      ],
      "criteria": [
        {
          "Crust": "Flavor, Texture (crispy / burnt / too thin)"
        }, {
          "Cheese": "Flavor, Amount (too much / little)"
        }, {
          "Toppings": "Flavor, Intregration (how well did it mix), Amount (too much / little)"
        }, {
          "Sauce": "Flavor, Amount (too much / little)"
        }, {
          "Presentation": "How did the menu look? How did the food look?"
        }, {
          "Beer Selection": "You need beer; it's important. Did they have 312?"
        }, {
          "Atmosphere": "Restaurant setup / feel, attentiveness of wait staff"
        }, {
          "Price": "Was the pizza expensive? Was it worth what they were charging?"
        }, {
          "Quality": "Overall pizza-eating experience"
        }
      ],
      "winner": "Lou Malnati's",
      "explanations": [
        {
          "name": "Jay",
          "review": "First thing's first. I had eaten Lou Malnati's for the first time a couple of weeks earlier and was the one that was recommended to Bryan that we go there for some pizza. I tried to take this pizza reviewing experience as scientifically as possible.<br /><br />We approached our reviewing mission head on, grabbing Lou's pizza as the first meal of our day. It of course was around noon, it was still the weekend and we had some hangovers to nurse. Lou's continued to provide me with not only the single best pizza getting experience, but arguable my best restaurant experience as a whole. We had, the now infamous between Bryan and I, Joey D. the rapping, singing, and overall most entertaining waiter I have ever had. He was amazingly attentive and would stop by to see if we needed anything and would then ask if we would like to hear his new rap. When it was finally pizza time we were amped, and the meal didn't disappoint. It seemed like the pizza was less of a bunch of good toppings on some good cheese on some good sauce on a good crust, but a perfect blend of all of these culminating in a singular unified fantastic mass of pizza. Although it was messy and at times needed silverware, it seemed impossible to have an imperfect bite of deliciousness. Coupled with a generally authentic Chicago restaurant, filled with sporting and Chicago oriented paraphernalia, the waiters and waitresses buzzed around with smiles on their faces, and the menu was exciting and almost aggressively lead us to a handful of their specialty pizzas that they were obviously known for. We left excited and hoping for a similar experience from Giordano's.<br /><br />From the first step in we weren't impressed with Giordano's. The only way I can describe the atmosphere is the forgotten New York branch of \"Giordano's and Co.\" It was more similar to \"Chuck E Cheese\" than anything else, but the one thing that was different is that \"Chuck E Cheese\" had some personality. We were lethargically brought to our seats as the people working there seemed to be more annoyed than anything that they had another table to tend to. The tables, by the way, were almost stacked on top of one another so you were worried about knocking over your neighbor's pizza when you were being seated. We tried to order something but the menu was equally if not more underwhelming having little to no excitement coming of the page. I felt like I was what shade of white I wanted to paint my walls in my office, not a nationally renowned Pizza. We enjoyed a beer and waited to see if the pizza would overcome the insurmountable odds. It unfortunately did not. Not to say that Giordano's wasn't a good pizza because it was. The cheese in particular was delicious and there was definitely a lot of it. There was just something missing. The crust and sauce were \"average\" and the toppings seemed like a completely separate element to the rest of the pizza. The crust to cheese to sauce to toppings ratio (yeah that) was HIGHLY skewed in the cheese's favor. It almost seemed unfair to judge it against Lou's. And that's where Gino's East came into play.<br /><br />The next day, after multiple food comas and more beer, we chose to expand our database and include Gino's East in our competition. We approached it similarly having it as the first meal of the day. We got there around noon right as it was opening. It was a cute little place with minimal seating and paper menus. It was a different feeling than any of our earlier competitors, but it was quaint and it felt like it wanted to have that overly basic kitchen style to it. The only issue was the dared to use COMIC SANS in their menus. EW. But we ordered our vegetarian pizza and got out our notepads. One notable thing that we felt bad having to mark down was the fact that Gino's is BYOB. That kind of brings the beer selection down to a 0 but I guess it's all variant on the beer you bring so we bumped it to a 1. At the final moment of truth we marveled at the amount of cheese our towering mass of pizza contained. We had to stop and take a picture of what was about an arms length of cheese coming off the first piece still attached to the rest of the pie. After wolfing down the first piece there was a silent agreement, this competition just got interesting. THIS was the deep dish pizza off we wanted to happen from the start. The crust was MAGNIFICENT. I'm pretty sure I could have just had the crust and been happy. But there was also cheese for DAYS and a marinara sauce that seemed to be more at home on pasta than a simple pizza (yes I consider that a very good thing) we continued our feast with envious eyes upon us, we were the first pizza served of the day, and it felt good.<br /><br />Ultimately we went back to my place and deliberated and began work on this site. The results are above and once the jury was in, it was quite obvious Lou's was the winner. Lou's was followed closely by Gino's, and obviously bringing up the rear is Giordano's. Either way, I would absolutely recommend all of these places to any tourist looking for some local flavor and it was really remarkable the variety of experiences and even styles of pizza provided by all three, and I assume even more with the ones we unfortunately couldn't squeeze in. Finally with broken diets and content taste buds we conclude our very first \"Versus\" competition with your humble judges Jayeth and Basheous III. I hope you enjoyed it as much as we did."
        }, {
          "name": "Bash",
          "review": "It's interesting how much these restaurants differ. Lou's was killer - Joey D rapped / sang, the building was really nice with tons of sports paraphernalia around, and it didn't feel like I was in a chain. Walking into Giordano's was disappointing; I felt like I was in a place that was just as likely to be in Boston. We arrived at Gino's a bit before opening, so it was quiet when we got there. The waiter was SUPER nice (although he didn't rap). All 3 pies looked amazing. The deciding factors came down to the sauce and presentation. The sauce at Giordano's literally tasted like Ragu - gross! It blended well, but on it's own was not very appetizing. Lou's was very tasty, and fit well with the rest of the ingredients. At Gino's, the sauce tasted more like pasta sauce - a plus for me, but stood out a bit much on the pizza. At Giordano's, we had to wait ~10 minutes between each waitress interaction; at Lou's, our waiter came by more frequently (if only to rap). Gino's waiter seemed like he really enjoyed being a waiter, and Jay and I wouldn't help but smile whenever he came over. Overall, Lou's was absolutely my favorite. That being said, Giordano's and Gino's both had good pizza. If you only had a lunch break within the loop and you didn't have time to make the wait at Lou's plus the 20 minute trip out there, Giordano's would still be a solid choice. Gino's came in second for me, with some really killer flavor. The toppings just weren't as up-to-snuff as Lou's. However, maybe the different locations of each could have made a difference - there's another Gino's in the loop as well."
        }
      ]
    }
  ];
  
});
window.require.register("lib/router", function(exports, require, module) {
  var IndexView, Router, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = require('application');

  IndexView = require('views/index');

  module.exports = Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      this.index = __bind(this.index, this);
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '*route': 'index'
    };

    Router.prototype.index = function() {
      return app.views.indexView = new IndexView();
    };

    return Router;

  })(Backbone.Router);
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  
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

  Handlebars.registerHelper("keys", function(list, ctx, fn) {
    var buffer, el, key, val, _i, _len;
    buffer = '';
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      for (key in el) {
        val = el[key];
        if (el.hasOwnProperty(key)) {
          buffer += fn({
            key: key,
            value: el[key],
            ctx: ctx
          });
        }
      }
    }
    return buffer;
  });

  Handlebars.registerHelper('pluck_criteria', function(list, key, fn) {
    var buffer, criteria, el, k, v, _i, _j, _len, _len1, _ref;
    buffer = '';
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      _ref = el.criteria;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        criteria = _ref[_j];
        for (k in criteria) {
          v = criteria[k];
          if (k === key) {
            buffer += fn({
              val: v
            });
          }
        }
      }
    }
    return buffer;
  });

  Handlebars.registerHelper('pluck', function(list, fn) {
    var buffer, el, k, v, _i, _len;
    buffer = '';
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      el = list[_i];
      for (k in el) {
        v = el[k];
        buffer += fn({
          key: k,
          val: v
        });
      }
    }
    return buffer;
  });

  Handlebars.registerHelper('total', function(contenders, fn) {
    var buffer, contender, criteria, name, score, total, _i, _j, _len, _len1, _ref;
    buffer = '';
    for (_i = 0, _len = contenders.length; _i < _len; _i++) {
      contender = contenders[_i];
      total = 0;
      _ref = contender.criteria;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        criteria = _ref[_j];
        for (name in criteria) {
          score = criteria[name];
          total += score;
        }
      }
      buffer += fn({
        val: total
      });
    }
    return buffer;
  });
  
});
window.require.register("models/battle", function(exports, require, module) {
  var Backbone, Battle,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone = this.Backbone || require('../../vendor/scripts/backbone');

  Battle = (function(_super) {

    __extends(Battle, _super);

    function Battle() {
      this.close = __bind(this.close, this);
      return Battle.__super__.constructor.apply(this, arguments);
    }

    Battle.prototype.url = 'api/v1/create/';

    Battle.prototype.defaults = function() {
      return {
        name: 'Unknown',
        contenders: [],
        winner: 'Unknown',
        explanations: {
          bash: 'Not disclosed',
          jay: 'Not disclosed'
        }
      };
    };

    Battle.prototype.close = function() {
      this.unbind();
      return typeof this.onClose === "function" ? this.onClose() : void 0;
    };

    return Battle;

  })(Backbone.Model);

  module.exports = Battle;
  
});
window.require.register("views/index", function(exports, require, module) {
  var BattleView, Battles, IndexView, View, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  Battles = require('../collections/battles');

  app = window.app;

  IndexView = (function(_super) {

    __extends(IndexView, _super);

    function IndexView() {
      this._toggle = __bind(this._toggle, this);

      this.toggleContact = __bind(this.toggleContact, this);

      this.toggleAbout = __bind(this.toggleAbout, this);

      this.initEls = __bind(this.initEls, this);

      this.initBattles = __bind(this.initBattles, this);

      this.initScrollers = __bind(this.initScrollers, this);

      this.afterRender = __bind(this.afterRender, this);

      this.initialize = __bind(this.initialize, this);
      return IndexView.__super__.constructor.apply(this, arguments);
    }

    IndexView.prototype.el = '.main-page';

    IndexView.prototype.views = [];

    IndexView.prototype.template = require('./templates/index');

    IndexView.prototype.events = {
      'click #about': 'toggleAbout',
      'click #contact': 'toggleContact'
    };

    IndexView.prototype.initialize = function() {
      this.collection = new Battles();
      return this.collection.fetch({
        success: this.render
      });
    };

    IndexView.prototype.afterRender = function() {
      return this.initEls().initScrollers().initBattles({
        success: this.initBattles
      });
    };

    IndexView.prototype.initScrollers = function() {
      this.$('#header').scrollPanel({
        topPadding: -109,
        change: function(type, $el) {
          if (type === 'fixed') {
            return $el.addClass('floating');
          } else {
            return $el.removeClass('floating');
          }
        }
      });
      this.$('#header-graphic').scrollPanel({
        topPadding: -109,
        change: function(type, $el) {
          if (type === 'fixed') {
            return $el.addClass('floating');
          } else {
            return $el.removeClass('floating');
          }
        }
      });
      return this;
    };

    IndexView.prototype.initBattles = function(args) {
      var _this = this;
      this.collection.each(function(battle) {
        var view;
        view = new BattleView({
          model: battle
        });
        _this.views.push(view);
        _this.$('#list').append(view.render().el);
        return view.trigger('slider');
      });
      return this;
    };

    IndexView.prototype.initEls = function() {
      this.$about = this.$('#about-panel');
      this.$aboutLink = this.$('#about');
      this.$contact = this.$('#contact-panel');
      this.$contactLink = this.$('#contact');
      return this;
    };

    IndexView.prototype.toggleAbout = function(event) {
      event.preventDefault();
      return this._toggle(this.$about, this.$contact, this.$aboutLink, this.$contactLink, 800);
    };

    IndexView.prototype.toggleContact = function(event) {
      event.preventDefault();
      return this._toggle(this.$contact, this.$about, this.$contactLink, this.$aboutLink, 350);
    };

    IndexView.prototype._toggle = function($el, $other, $elLink, $otherLink, speed) {
      if ($el.is(':visible')) {
        $elLink.removeClass('selected');
        $el.slideUp(speed);
      } else {
        $elLink.addClass('selected');
        $el.slideDown(speed);
      }
      if ($other.is(':visible')) {
        $otherLink.removeClass('selected');
        $other.slideUp(350);
      }
      return this;
    };

    return IndexView;

  })(View);

  BattleView = (function(_super) {

    __extends(BattleView, _super);

    function BattleView() {
      this.afterRender = __bind(this.afterRender, this);

      this.initSlider = __bind(this.initSlider, this);

      this.getRenderData = __bind(this.getRenderData, this);

      this.initialize = __bind(this.initialize, this);
      return BattleView.__super__.constructor.apply(this, arguments);
    }

    BattleView.prototype.tagName = 'li';

    BattleView.prototype.tagClass = 'battle';

    BattleView.prototype.template = require('./templates/battle');

    BattleView.prototype.initialize = function() {
      return this.on('slider', this.initSlider);
    };

    BattleView.prototype.getRenderData = function() {
      return this.model.toJSON();
    };

    BattleView.prototype.initSlider = function() {
      return this.$('.deep-dish-pizza').scrollPanel({
        topPadding: -39,
        change: function(type, $el) {
          if (type === 'fixed') {
            return $el.addClass('floating');
          } else {
            return $el.removeClass('floating');
          }
        }
      });
    };

    BattleView.prototype.afterRender = function() {
      var $picTables, $pics;
      $picTables = this.$('.battle-pictures-wrap table');
      $pics = $picTables.find('.pic');
      $pics.find('img').hover(function() {
        var $el;
        $el = $(this);
        $el.parent().css('z-index', 1);
        return $el.animate({
          height: 325,
          width: 325,
          left: '-=50',
          top: '-=50'
        }, 'fast');
      }, function() {
        var $el;
        $el = $(this);
        return $el.animate({
          height: 225,
          width: 225,
          left: '+=50',
          top: '+=50'
        }, 'fast', function() {
          return $el.parent().css('z-index', 0);
        });
      });
      return $pics.each(function(index, el) {
        var $el;
        $el = $(el);
        return setTimeout(function() {
          var pos;
          pos = $el.position();
          return $el.css({
            position: 'absolute',
            left: pos.left,
            top: pos.top
          });
        }, 500);
      });
    };

    return BattleView;

  })(View);

  module.exports = IndexView;
  
});
window.require.register("views/templates/battle", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                    <th class=\"contender\">";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</th>\n                    ";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "", stack1, stack2, stack3;
    buffer += "\n                <tr>\n                    <td class=\"criteria\">\n                        <span class=\"name\">";
    foundHelper = helpers.key;
    stack1 = foundHelper || depth0.key;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "key", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</span>\n                        <span class=\"desc\">";
    foundHelper = helpers.value;
    stack1 = foundHelper || depth0.value;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "value", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</span>\n                    </td>\n                    ";
    foundHelper = helpers.key;
    stack1 = foundHelper || depth0.key;
    foundHelper = helpers.ctx;
    stack2 = foundHelper || depth0.ctx;
    foundHelper = helpers.pluck_criteria;
    stack3 = foundHelper || depth0.pluck_criteria;
    tmp1 = self.program(4, program4, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                </tr>\n                ";
    return buffer;}
  function program4(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                    <td>\n                        <div class=\"rank-wrap\">\n                            <div class=\"rank\">";
    foundHelper = helpers.val;
    stack1 = foundHelper || depth0.val;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "val", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n                        </div>\n                    </td>\n                    ";
    return buffer;}

  function program6(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                    <td>\n                        <div class=\"rank-wrap\">\n                            <div class=\"rank\">";
    foundHelper = helpers.val;
    stack1 = foundHelper || depth0.val;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "val", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n                        </div>\n                    </td>\n                    ";
    return buffer;}

  function program8(depth0,data) {
    
    var buffer = "", stack1, stack2;
    buffer += "\n    <table class=\"pictures\">\n        <thead>\n            <tr>\n                <td></td>\n                <td></td>\n                <td></td>\n                <td></td>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                ";
    foundHelper = helpers.pictures;
    stack1 = foundHelper || depth0.pictures;
    stack2 = helpers.each;
    tmp1 = self.program(9, program9, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n            </tr>\n        </tbody>\n    </table>\n    ";
    return buffer;}
  function program9(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                <td>\n                    <div class=\"pic-wrap\">\n                        <div class=\"pic\">\n                            <img src=\"";
    stack1 = depth0;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\" />\n                        </div>\n                    </div>\n                </td>\n                ";
    return buffer;}

  function program11(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n    <div class=\"explanation\">\n        <blockquote>\n            <p>";
    foundHelper = helpers.review;
    stack1 = foundHelper || depth0.review;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "review", { hash: {} }); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</p>\n        </blockquote>\n        <p>";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</p>\n    </div>\n    ";
    return buffer;}

    buffer += "<div class=\"logo-wrap\">\n    <div class=\"logo ";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\"></div>\n</div>\n\n<div class=\"battle-description\">\n    <p>";
    foundHelper = helpers.description;
    stack1 = foundHelper || depth0.description;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</p>\n</div>\n\n<div class=\"battle-segway\">\n    <p>------- The data -------</p>\n</div>\n\n<div class=\"battle-wrap\">\n    <div class=\"battle-inner\">\n        <table class=\"battle\">\n            <thead>\n                <tr>\n                    <th></th>\n                    ";
    foundHelper = helpers.contenders;
    stack1 = foundHelper || depth0.contenders;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                </tr>\n            </thead>\n            <tbody>\n                ";
    foundHelper = helpers.contenders;
    stack1 = foundHelper || depth0.contenders;
    foundHelper = helpers.criteria;
    stack2 = foundHelper || depth0.criteria;
    foundHelper = helpers.keys;
    stack3 = foundHelper || depth0.keys;
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                <!-- Totals! -->\n                <tr class=\"break\">\n                    <td colspan=\"4\">\n                        <hr size=\"2\"></hr>\n                    </td>\n                <tr>\n                    <td class=\"criteria\">\n                        <span class=\"name\">Total</span>\n                    </td>\n                    ";
    foundHelper = helpers.contenders;
    stack1 = foundHelper || depth0.contenders;
    foundHelper = helpers.total;
    stack2 = foundHelper || depth0.total;
    tmp1 = self.program(6, program6, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<div class=\"battle-segway\">\n    <p>------- The Proof -------</p>\n</div>\n<div class=\"battle-pictures-wrap\">\n    ";
    foundHelper = helpers.contenders;
    stack1 = foundHelper || depth0.contenders;
    stack2 = helpers.each;
    tmp1 = self.program(8, program8, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>\n\n<div class=\"battle-segway\">\n    <p>------- The Verdicts -------</p>\n    <p class=\"subtitle\">(scroll for full text)</p>\n</div>\n\n<div class=\"explanations\">\n    ";
    foundHelper = helpers.explanations;
    stack1 = foundHelper || depth0.explanations;
    stack2 = helpers.each;
    tmp1 = self.program(11, program11, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n    <div class=\"clear\"></div>\n</div>\n";
    return buffer;});
});
window.require.register("views/templates/index", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header-wrap\">\n    <div id=\"header\"></div>\n    <div id=\"header-graphic-wrap\">\n        <div id=\"header-graphic\"></div>\n    </div>\n</div>\n\n<div id=\"index-view\">\n    <div id=\"list\"></div>\n</div>\n\n<div id=\"footer-wrap\">\n    <div id=\"footer\">\n        <span id=\"tagline\">Made with &hearts; and humor</span>\n        <span class=\"inline-divider\">|</span>\n        <span id=\"about\">Who Are We?</span>\n        <span class=\"inline-divider\">|</span>\n        <span id=\"contact\">Contact Us</span>\n        <span class=\"inline-divider\">|</span>\n        <span id=\"copyright\">&copy; 2012</span>\n    </div>\n</div>\n\n<div id=\"footer-panels\">\n    <div id=\"about-panel\">\n        <div id=\"about-content\">\n            <div id=\"about-img-wrap\" class=\"left\">\n                <img src=\"/static/images/about.jpg\" />\n            </div>\n            <div id=\"about-txt-wrap\" class=\"left\">\n                <span class=\"title\">The Crew</span>\n                <p>Jayeth and Basheus are just two dudes versus the world. In Boston, we have Basheus: a debonair, industrious code monkey who loves all things tech, fitness and music. In Chicago resides Jayeth: imaginative, dexterous and graphics-savvy, spreading visuals and musical prowess to the masses.</p>\n\n                <span class=\"title\">The Task</span>\n                <p>Conquering Boston and Chicago is just one feat on their list. Long-time friends and bandmates, these two have seen many things. Why not rate and assess really minscule, unnecessary, potentially uninteresting things? The world is their oyster.<p>\n\n                <p>Gauntlet thrown; gauntlet picked up.</p>\n            </div>\n        </div>\n    </div>\n    <div id=\"contact-panel\">\n        <div id=\"contact-content\">\n            <div id=\"contact-jay\" class=\"left\">\n                <span class=\"name\">Jay</span>\n\n                <a href=\"https://twitter.com/JaySpiwak\" class=\"twitter-follow-button\" data-show-count=\"false\" data-show-screen-name=\"false\">Follow @JaySpiwak</a>\n                <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=\"//platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>\n\n                <a class=\"personal-site\" target=\"_blank\" href=\"http://www.jspiwak.com/\">www.jspiwak.com</a>\n            </div>\n            <div id=\"contact-bash\" class=\"left\">\n                <span class=\"name\">Bash</span>\n\n                <a href=\"https://twitter.com/Bryan_Ash\" class=\"twitter-follow-button\" data-show-count=\"false\" data-show-screen-name=\"false\">Follow @Bryan_Ash</a>\n                <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=\"//platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>\n\n                <a class=\"personal-site\" target=\"_blank\" href=\"http://bry.io\">bry.io</a>\n            </div>\n        </div>\n    </div>\n</div>\n";});
});
window.require.register("views/view", function(exports, require, module) {
  var View, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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
  
});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value2) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
};
var __privateSet = (obj, member, value2, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value2) : member.set(obj, value2);
  return value2;
};

// node_modules/hast-util-heading-rank/index.js
function headingRank(node) {
  var name = node && node.type === "element" && node.tagName.toLowerCase() || "";
  var code2 = name.length === 2 && name.charCodeAt(0) === 104 ? name.charCodeAt(1) : 0;
  return code2 > 48 && code2 < 55 ? code2 - 48 : null;
}
var init_hast_util_heading_rank = __esm({
  "node_modules/hast-util-heading-rank/index.js"() {
  }
});

// node_modules/unist-util-is/index.js
function anyFactory(tests) {
  const checks2 = [];
  let index = -1;
  while (++index < tests.length) {
    checks2[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks2.length) {
      if (checks2[index2].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all2);
  function all2(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters));
  }
}
function ok() {
  return true;
}
var convert;
var init_unist_util_is = __esm({
  "node_modules/unist-util-is/index.js"() {
    convert = function(test) {
      if (test === void 0 || test === null) {
        return ok;
      }
      if (typeof test === "string") {
        return typeFactory(test);
      }
      if (typeof test === "object") {
        return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
      }
      if (typeof test === "function") {
        return castFactory(test);
      }
      throw new Error("Expected function, string, or object as test");
    };
  }
});

// node_modules/unist-util-visit-parents/color.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}
var init_color = __esm({
  "node_modules/unist-util-visit-parents/color.js"() {
  }
});

// node_modules/unist-util-visit-parents/index.js
function toResult(value2) {
  if (Array.isArray(value2)) {
    return value2;
  }
  if (typeof value2 === "number") {
    return [CONTINUE, value2];
  }
  return [value2];
}
var CONTINUE, SKIP, EXIT, visitParents;
var init_unist_util_visit_parents = __esm({
  "node_modules/unist-util-visit-parents/index.js"() {
    init_unist_util_is();
    init_color();
    CONTINUE = true;
    SKIP = "skip";
    EXIT = false;
    visitParents = function(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      const is = convert(test);
      const step = reverse ? -1 : 1;
      factory(tree, null, [])();
      function factory(node, index, parents) {
        const value2 = typeof node === "object" && node !== null ? node : {};
        let name;
        if (typeof value2.type === "string") {
          name = typeof value2.tagName === "string" ? value2.tagName : typeof value2.name === "string" ? value2.name : void 0;
          Object.defineProperty(visit2, "name", {
            value: "node (" + color(value2.type + (name ? "<" + name + ">" : "")) + ")"
          });
        }
        return visit2;
        function visit2() {
          let result = [];
          let subresult;
          let offset;
          let grandparents;
          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents));
            if (result[0] === EXIT) {
              return result;
            }
          }
          if (node.children && result[0] !== SKIP) {
            offset = (reverse ? node.children.length : -1) + step;
            grandparents = parents.concat(node);
            while (offset > -1 && offset < node.children.length) {
              subresult = factory(node.children[offset], offset, grandparents)();
              if (subresult[0] === EXIT) {
                return subresult;
              }
              offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
            }
          }
          return result;
        }
      }
    };
  }
});

// node_modules/unist-util-visit/index.js
var visit;
var init_unist_util_visit = __esm({
  "node_modules/unist-util-visit/index.js"() {
    init_unist_util_visit_parents();
    init_unist_util_visit_parents();
    visit = function(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        const parent = parents[parents.length - 1];
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        );
      }
    };
  }
});

// node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "node_modules/yaml/dist/nodes/Node.js"(exports) {
    "use strict";
    var ALIAS = Symbol.for("yaml.alias");
    var DOC = Symbol.for("yaml.document");
    var MAP = Symbol.for("yaml.map");
    var PAIR = Symbol.for("yaml.pair");
    var SCALAR = Symbol.for("yaml.scalar");
    var SEQ = Symbol.for("yaml.seq");
    var NODE_TYPE = Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, NODE_TYPE, { value: type });
      }
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
    };
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.NodeBase = NodeBase;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection;
    exports.isDocument = isDocument;
    exports.isMap = isMap;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar;
    exports.isSeq = isSeq;
  }
});

// node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "node_modules/yaml/dist/visit.js"(exports) {
    "use strict";
    var Node = require_Node();
    var BREAK = Symbol("break visit");
    var SKIP2 = Symbol("skip children");
    var REMOVE = Symbol("remove node");
    function visit2(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (Node.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit2.BREAK = BREAK;
    visit2.SKIP = SKIP2;
    visit2.REMOVE = REMOVE;
    function visit_(key, node, visitor, path2) {
      const ctrl = callVisitor(key, node, visitor, path2);
      if (Node.isNode(ctrl) || Node.isPair(ctrl)) {
        replaceNode(key, path2, ctrl);
        return visit_(key, ctrl, visitor, path2);
      }
      if (typeof ctrl !== "symbol") {
        if (Node.isCollection(node)) {
          path2 = Object.freeze(path2.concat(node));
          for (let i2 = 0; i2 < node.items.length; ++i2) {
            const ci = visit_(i2, node.items[i2], visitor, path2);
            if (typeof ci === "number")
              i2 = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i2, 1);
              i2 -= 1;
            }
          }
        } else if (Node.isPair(node)) {
          path2 = Object.freeze(path2.concat(node));
          const ck = visit_("key", node.key, visitor, path2);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path2);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (Node.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP2;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path2) {
      const ctrl = await callVisitor(key, node, visitor, path2);
      if (Node.isNode(ctrl) || Node.isPair(ctrl)) {
        replaceNode(key, path2, ctrl);
        return visitAsync_(key, ctrl, visitor, path2);
      }
      if (typeof ctrl !== "symbol") {
        if (Node.isCollection(node)) {
          path2 = Object.freeze(path2.concat(node));
          for (let i2 = 0; i2 < node.items.length; ++i2) {
            const ci = await visitAsync_(i2, node.items[i2], visitor, path2);
            if (typeof ci === "number")
              i2 = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i2, 1);
              i2 -= 1;
            }
          }
        } else if (Node.isPair(node)) {
          path2 = Object.freeze(path2.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path2);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path2);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path2) {
      var _a6, _b, _c, _d2, _e;
      if (typeof visitor === "function")
        return visitor(key, node, path2);
      if (Node.isMap(node))
        return (_a6 = visitor.Map) == null ? void 0 : _a6.call(visitor, key, node, path2);
      if (Node.isSeq(node))
        return (_b = visitor.Seq) == null ? void 0 : _b.call(visitor, key, node, path2);
      if (Node.isPair(node))
        return (_c = visitor.Pair) == null ? void 0 : _c.call(visitor, key, node, path2);
      if (Node.isScalar(node))
        return (_d2 = visitor.Scalar) == null ? void 0 : _d2.call(visitor, key, node, path2);
      if (Node.isAlias(node))
        return (_e = visitor.Alias) == null ? void 0 : _e.call(visitor, key, node, path2);
      return void 0;
    }
    function replaceNode(key, path2, node) {
      const parent = path2[path2.length - 1];
      if (Node.isCollection(parent)) {
        parent.items[key] = node;
      } else if (Node.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (Node.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = Node.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports.visit = visit2;
    exports.visitAsync = visitAsync;
  }
});

// node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "node_modules/yaml/dist/doc/directives.js"(exports) {
    "use strict";
    var Node = require_Node();
    var visit2 = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class {
      constructor(yaml2, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, Directives.defaultYaml, yaml2);
        this.tags = Object.assign({}, Directives.defaultTags, tags);
      }
      clone() {
        const copy = new Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      atDocument() {
        const res = new Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, Directives.defaultTags);
            break;
        }
        return res;
      }
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix)
          return prefix + decodeURIComponent(suffix);
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && Node.isNode(doc.contents)) {
          const tags = {};
          visit2.visit(doc.contents, (_key, node) => {
            if (Node.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports.Directives = Directives;
  }
});

// node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "node_modules/yaml/dist/doc/anchors.js"(exports) {
    "use strict";
    var Node = require_Node();
    var visit2 = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit2.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i2 = 1; true; ++i2) {
        const name = `${prefix}${i2}`;
        if (!exclude.has(name))
          return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          if (!prevAnchors)
            prevAnchors = anchorNames(doc);
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (Node.isScalar(ref.node) || Node.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});

// node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "node_modules/yaml/dist/nodes/Alias.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var visit2 = require_visit();
    var Node = require_Node();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(Node.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      resolve(doc) {
        let found = void 0;
        visit2.visit(doc, {
          Node: (_key, node) => {
            if (node === this)
              return visit2.visit.BREAK;
            if (node.anchor === this.source)
              found = node;
          }
        });
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const { anchors: anchors2, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        const data = anchors2.get(source);
        if (!data || data.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data.count += 1;
          if (data.aliasCount === 0)
            data.aliasCount = getAliasCount(doc, source, anchors2);
          if (data.count * data.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (Node.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (Node.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c2 = getAliasCount(doc, item, anchors2);
          if (c2 > count)
            count = c2;
        }
        return count;
      } else if (Node.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});

// node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "node_modules/yaml/dist/nodes/toJS.js"(exports) {
    "use strict";
    var Node = require_Node();
    function toJS(value2, arg, ctx) {
      if (Array.isArray(value2))
        return value2.map((v, i2) => toJS(v, String(i2), ctx));
      if (value2 && typeof value2.toJSON === "function") {
        if (!ctx || !Node.hasAnchor(value2))
          return value2.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value2, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value2.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value2 === "bigint" && !(ctx == null ? void 0 : ctx.keep))
        return Number(value2);
      return value2;
    }
    exports.toJS = toJS;
  }
});

// node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "node_modules/yaml/dist/nodes/Scalar.js"(exports) {
    "use strict";
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value2) => !value2 || typeof value2 !== "function" && typeof value2 !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value2) {
        super(Node.SCALAR);
        this.value = value2;
      }
      toJSON(arg, ctx) {
        return (ctx == null ? void 0 : ctx.keep) ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});

// node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "node_modules/yaml/dist/doc/createNode.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var Node = require_Node();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value2, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t2) => t2.tag === tagName);
        const tagObj = match.find((t2) => !t2.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t2) => {
        var _a6;
        return ((_a6 = t2.identify) == null ? void 0 : _a6.call(t2, value2)) && !t2.format;
      });
    }
    function createNode(value2, tagName, ctx) {
      var _a6, _b;
      if (Node.isDocument(value2))
        value2 = value2.contents;
      if (Node.isNode(value2))
        return value2;
      if (Node.isPair(value2)) {
        const map = (_b = (_a6 = ctx.schema[Node.MAP]).createNode) == null ? void 0 : _b.call(_a6, ctx.schema, null, ctx);
        map.items.push(value2);
        return map;
      }
      if (value2 instanceof String || value2 instanceof Number || value2 instanceof Boolean || typeof BigInt !== "undefined" && value2 instanceof BigInt) {
        value2 = value2.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value2 && typeof value2 === "object") {
        ref = sourceObjects.get(value2);
        if (ref) {
          if (!ref.anchor)
            ref.anchor = onAnchor(value2);
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value2, ref);
        }
      }
      if (tagName == null ? void 0 : tagName.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value2, tagName, schema.tags);
      if (!tagObj) {
        if (value2 && typeof value2.toJSON === "function") {
          value2 = value2.toJSON();
        }
        if (!value2 || typeof value2 !== "object") {
          const node2 = new Scalar.Scalar(value2);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value2 instanceof Map ? schema[Node.MAP] : Symbol.iterator in Object(value2) ? schema[Node.SEQ] : schema[Node.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = (tagObj == null ? void 0 : tagObj.createNode) ? tagObj.createNode(ctx.schema, value2, ctx) : new Scalar.Scalar(value2);
      if (tagName)
        node.tag = tagName;
      if (ref)
        ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});

// node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "node_modules/yaml/dist/nodes/Collection.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var Node = require_Node();
    function collectionFromPath(schema, path2, value2) {
      let v = value2;
      for (let i2 = path2.length - 1; i2 >= 0; --i2) {
        const k = path2[i2];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path2) => path2 == null || typeof path2 === "object" && !!path2[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => Node.isNode(it) || Node.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      addIn(path2, value2) {
        if (isEmptyPath(path2))
          this.add(value2);
        else {
          const [key, ...rest] = path2;
          const node = this.get(key, true);
          if (Node.isCollection(node))
            node.addIn(rest, value2);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value2));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      deleteIn(path2) {
        const [key, ...rest] = path2;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (Node.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      getIn(path2, keepScalar) {
        const [key, ...rest] = path2;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && Node.isScalar(node) ? node.value : node;
        else
          return Node.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!Node.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && Node.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      hasIn(path2) {
        const [key, ...rest] = path2;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return Node.isCollection(node) ? node.hasIn(rest) : false;
      }
      setIn(path2, value2) {
        const [key, ...rest] = path2;
        if (rest.length === 0) {
          this.set(key, value2);
        } else {
          const node = this.get(key, true);
          if (Node.isCollection(node))
            node.setIn(rest, value2);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value2));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    Collection.maxFlowStringSingleLineLength = 60;
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});

// node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyComment.js"(exports) {
    "use strict";
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent2) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent2 ? comment.replace(/^(?! *$)/gm, indent2) : comment;
    }
    var lineComment = (str, indent2, comment) => str.endsWith("\n") ? indentComment(comment, indent2) : comment.includes("\n") ? "\n" + indentComment(comment, indent2) : (str.endsWith(" ") ? "" : " ") + comment;
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});

// node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "node_modules/yaml/dist/stringify/foldFlowLines.js"(exports) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text2, indent2, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text2;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent2.length);
      if (text2.length <= endStep)
        return text2;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent2.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i2 = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i2 = consumeMoreIndentedLines(text2, i2);
        if (i2 !== -1)
          end = i2 + endStep;
      }
      for (let ch; ch = text2[i2 += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i2;
          switch (text2[i2 + 1]) {
            case "x":
              i2 += 3;
              break;
            case "u":
              i2 += 5;
              break;
            case "U":
              i2 += 9;
              break;
            default:
              i2 += 1;
          }
          escEnd = i2;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i2 = consumeMoreIndentedLines(text2, i2);
          end = i2 + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text2[i2 + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i2;
          }
          if (i2 >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text2[i2 += 1];
                overflow = true;
              }
              const j = i2 > escEnd + 1 ? i2 - 2 : escStart - 1;
              if (escapedFolds[j])
                return text2;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text2;
      if (onFold)
        onFold();
      let res = text2.slice(0, folds[0]);
      for (let i3 = 0; i3 < folds.length; ++i3) {
        const fold = folds[i3];
        const end2 = folds[i3 + 1] || text2.length;
        if (fold === 0)
          res = `
${indent2}${text2.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text2[fold]}\\`;
          res += `
${indent2}${text2.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text2, i2) {
      let ch = text2[i2 + 1];
      while (ch === " " || ch === "	") {
        do {
          ch = text2[i2 += 1];
        } while (ch && ch !== "\n");
        ch = text2[i2 + 1];
      }
      return i2;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});

// node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyString.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx) => ({
      indentAtStart: ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i2 = 0, start = 0; i2 < strLen; ++i2) {
        if (str[i2] === "\n") {
          if (i2 - start > limit)
            return true;
          start = i2 + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value2, ctx) {
      const json2 = JSON.stringify(value2);
      if (ctx.options.doubleQuotedAsJSON)
        return json2;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent2 = ctx.indent || (containsDocumentMarker(value2) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i2 = 0, ch = json2[i2]; ch; ch = json2[++i2]) {
        if (ch === " " && json2[i2 + 1] === "\\" && json2[i2 + 2] === "n") {
          str += json2.slice(start, i2) + "\\ ";
          i2 += 1;
          start = i2;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json2[i2 + 1]) {
            case "u":
              {
                str += json2.slice(start, i2);
                const code2 = json2.substr(i2 + 2, 4);
                switch (code2) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code2.substr(0, 2) === "00")
                      str += "\\x" + code2.substr(2);
                    else
                      str += json2.substr(i2, 6);
                }
                i2 += 5;
                start = i2 + 1;
              }
              break;
            case "n":
              if (implicitKey || json2[i2 + 2] === '"' || json2.length < minMultiLineLength) {
                i2 += 1;
              } else {
                str += json2.slice(start, i2) + "\n\n";
                while (json2[i2 + 2] === "\\" && json2[i2 + 3] === "n" && json2[i2 + 4] !== '"') {
                  str += "\n";
                  i2 += 2;
                }
                str += indent2;
                if (json2[i2 + 2] === " ")
                  str += "\\";
                i2 += 1;
                start = i2 + 1;
              }
              break;
            default:
              i2 += 1;
          }
      }
      str = start ? str + json2.slice(start) : json2;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent2, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx));
    }
    function singleQuotedString(value2, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value2.includes("\n") || /[ \t]\n|\n[ \t]/.test(value2))
        return doubleQuotedString(value2, ctx);
      const indent2 = ctx.indent || (containsDocumentMarker(value2) ? "  " : "");
      const res = "'" + value2.replace(/'/g, "''").replace(/\n+/g, `$&
${indent2}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent2, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx));
    }
    function quotedString(value2, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value2.includes('"');
        const hasSingle = value2.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value2, ctx);
    }
    function blockString({ comment, type, value: value2 }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value2) || /^\s*$/.test(value2)) {
        return quotedString(value2, ctx);
      }
      const indent2 = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value2) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value2, lineWidth, indent2.length);
      if (!value2)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value2.length; endStart > 0; --endStart) {
        const ch = value2[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value2.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value2 === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value2 = value2.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(/\n+(?!\n|$)/g, `$&${indent2}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value2.length; ++startEnd) {
        const ch = value2[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value2.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value2 = value2.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent2}`);
      }
      const indentSize = indent2 ? "2" : "1";
      let header = (literal ? "|" : ">") + (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (literal) {
        value2 = value2.replace(/\n+/g, `$&${indent2}`);
        return `${header}
${indent2}${start}${value2}${end}`;
      }
      value2 = value2.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent2}`);
      const body = foldFlowLines.foldFlowLines(`${start}${value2}${end}`, indent2, foldFlowLines.FOLD_BLOCK, getFoldOptions(ctx));
      return `${header}
${indent2}${body}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value: value2 } = item;
      const { actualString, implicitKey, indent: indent2, inFlow } = ctx;
      if (implicitKey && /[\n[\]{},]/.test(value2) || inFlow && /[[\]{},]/.test(value2)) {
        return quotedString(value2, ctx);
      }
      if (!value2 || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value2)) {
        return implicitKey || inFlow || !value2.includes("\n") ? quotedString(value2, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value2.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (indent2 === "" && containsDocumentMarker(value2)) {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
      }
      const str = value2.replace(/\n+/g, `$&
${indent2}`);
      if (actualString) {
        const test = (tag) => {
          var _a6;
          return tag.default && tag.tag !== "tag:yaml.org,2002:str" && ((_a6 = tag.test) == null ? void 0 : _a6.test(str));
        };
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || (compat == null ? void 0 : compat.some(test)))
          return quotedString(value2, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent2, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type2) => {
        switch (_type2) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t2 = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t2);
        if (res === null)
          throw new Error(`Unsupported default string type ${t2}`);
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});

// node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "node_modules/yaml/dist/stringify/stringify.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var Node = require_Node();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options2) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options2);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      var _a6;
      if (item.tag) {
        const match = tags.filter((t2) => t2.tag === item.tag);
        if (match.length > 0)
          return match.find((t2) => t2.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (Node.isScalar(item)) {
        obj = item.value;
        const match = tags.filter((t2) => {
          var _a7;
          return (_a7 = t2.identify) == null ? void 0 : _a7.call(t2, obj);
        });
        tagObj = match.find((t2) => t2.format === item.format) ?? match.find((t2) => !t2.format);
      } else {
        obj = item;
        tagObj = tags.find((t2) => t2.nodeClass && obj instanceof t2.nodeClass);
      }
      if (!tagObj) {
        const name = ((_a6 = obj == null ? void 0 : obj.constructor) == null ? void 0 : _a6.name) ?? typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (Node.isScalar(node) || Node.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ? node.tag : tagObj.default ? null : tagObj.tag;
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify2(item, ctx, onComment, onChompKeep) {
      var _a6;
      if (Node.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (Node.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if ((_a6 = ctx.resolvedAliases) == null ? void 0 : _a6.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = Node.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      if (!tagObj)
        tagObj = getTagObject(ctx.doc.schema.tags, node);
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : Node.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return Node.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify2;
  }
});

// node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyPair.js"(exports) {
    "use strict";
    var Node = require_Node();
    var Scalar = require_Scalar();
    var stringify2 = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value: value2 }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent: indent2, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = Node.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (Node.isCollection(key)) {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value2 == null && !ctx.inFlow || Node.isCollection(key) || (Node.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent2 + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify2.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value2 == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value2 == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent2}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vcb = "";
      let valueComment = null;
      if (Node.isNode(value2)) {
        if (value2.spaceBefore)
          vcb = "\n";
        if (value2.commentBefore) {
          const cs = commentString(value2.commentBefore);
          vcb += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        valueComment = value2.comment;
      } else if (value2 && typeof value2 === "object") {
        value2 = doc.createNode(value2);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && Node.isScalar(value2))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && Node.isSeq(value2) && !value2.flow && !value2.tag && !value2.anchor) {
        ctx.indent = ctx.indent.substr(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify2.stringify(value2, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (vcb || keyComment) {
        if (valueStr === "" && !ctx.inFlow)
          ws = vcb === "\n" ? "\n\n" : vcb;
        else
          ws = `${vcb}
${ctx.indent}`;
      } else if (!explicitKey && Node.isCollection(value2)) {
        const flow = valueStr[0] === "[" || valueStr[0] === "{";
        if (!flow || valueStr.includes("\n"))
          ws = `
${ctx.indent}`;
      } else if (valueStr === "" || valueStr[0] === "\n")
        ws = "";
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});

// node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "node_modules/yaml/dist/log.js"(exports) {
    "use strict";
    function debug(logLevel, ...messages2) {
      if (logLevel === "debug")
        console.log(...messages2);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof process !== "undefined" && process.emitWarning)
          process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});

// node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports) {
    "use strict";
    var log = require_log();
    var stringify2 = require_stringify();
    var Node = require_Node();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var MERGE_KEY = "<<";
    function addPairToJSMap(ctx, map, { key, value: value2 }) {
      if ((ctx == null ? void 0 : ctx.doc.schema.merge) && isMergeKey(key)) {
        value2 = Node.isAlias(value2) ? value2.resolve(ctx.doc) : value2;
        if (Node.isSeq(value2))
          for (const it of value2.items)
            mergeToJSMap(ctx, map, it);
        else if (Array.isArray(value2))
          for (const it of value2)
            mergeToJSMap(ctx, map, it);
        else
          mergeToJSMap(ctx, map, value2);
      } else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value2, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value2, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    var isMergeKey = (key) => key === MERGE_KEY || Node.isScalar(key) && key.value === MERGE_KEY && (!key.type || key.type === Scalar.Scalar.PLAIN);
    function mergeToJSMap(ctx, map, value2) {
      const source = ctx && Node.isAlias(value2) ? value2.resolve(ctx.doc) : value2;
      if (!Node.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value3] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value3);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value3,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (Node.isNode(key) && ctx && ctx.doc) {
        const strCtx = stringify2.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});

// node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "node_modules/yaml/dist/nodes/Pair.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var Node = require_Node();
    function createPair(key, value2, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value2, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class {
      constructor(key, value2 = null) {
        Object.defineProperty(this, Node.NODE_TYPE, { value: Node.PAIR });
        this.key = key;
        this.value = value2;
      }
      clone(schema) {
        let { key, value: value2 } = this;
        if (Node.isNode(key))
          key = key.clone(schema);
        if (Node.isNode(value2))
          value2 = value2.clone(schema);
        return new Pair(key, value2);
      }
      toJSON(_2, ctx) {
        const pair = (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return (ctx == null ? void 0 : ctx.doc) ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});

// node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyCollection.js"(exports) {
    "use strict";
    var Collection = require_Collection();
    var Node = require_Node();
    var stringify2 = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options2) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify3 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify3(collection, ctx, options2);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent: indent2, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i2 = 0; i2 < items.length; ++i2) {
        const item = items[i2];
        let comment2 = null;
        if (Node.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (Node.isPair(item)) {
          const ik = Node.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify2.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i2 = 1; i2 < lines.length; ++i2) {
          const line = lines[i2];
          str += line ? `
${indent2}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent2);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ comment, items }, ctx, { flowChars, itemIndent, onComment }) {
      const { indent: indent2, indentStep, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i2 = 0; i2 < items.length; ++i2) {
        const item = items[i2];
        let comment2 = null;
        if (Node.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment2 = item.comment;
        } else if (Node.isPair(item)) {
          const ik = Node.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = Node.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment2 = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik && ik.comment) {
            comment2 = ik.comment;
          }
        }
        if (comment2)
          reqNewline = true;
        let str2 = stringify2.stringify(item, itemCtx, () => comment2 = null);
        if (i2 < items.length - 1)
          str2 += ",";
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (!reqNewline && (lines.length > linesAtValue || str2.includes("\n")))
          reqNewline = true;
        lines.push(str2);
        linesAtValue = lines.length;
      }
      let str;
      const { start, end } = flowChars;
      if (lines.length === 0) {
        str = start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = len > Collection.Collection.maxFlowStringSingleLineLength;
        }
        if (reqNewline) {
          str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent2}${line}` : "\n";
          str += `
${indent2}${end}`;
        } else {
          str = `${start} ${lines.join(" ")} ${end}`;
        }
      }
      if (comment) {
        str += stringifyComment.lineComment(str, commentString(comment), indent2);
        if (onComment)
          onComment();
      }
      return str;
    }
    function addCommentBefore({ indent: indent2, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent2);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});

// node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLMap.js"(exports) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var Node = require_Node();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = Node.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (Node.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (Node.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      constructor(schema) {
        super(Node.MAP, schema);
        this.items = [];
      }
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      add(pair, overwrite) {
        var _a6;
        let _pair;
        if (Node.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair == null ? void 0 : pair.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = (_a6 = this.schema) == null ? void 0 : _a6.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (Node.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i2 = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i2 === -1)
            this.items.push(_pair);
          else
            this.items.splice(i2, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it == null ? void 0 : it.value;
        return (!keepScalar && Node.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value2) {
        this.add(new Pair.Pair(key, value2), true);
      }
      toJSON(_2, ctx, Type) {
        const map = Type ? new Type() : (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
        if (ctx == null ? void 0 : ctx.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!Node.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair;
  }
});

// node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "node_modules/yaml/dist/schema/common/map.js"(exports) {
    "use strict";
    var Node = require_Node();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    function createMap(schema, obj, ctx) {
      const { keepUndefined, replacer } = ctx;
      const map2 = new YAMLMap.YAMLMap(schema);
      const add = (key, value2) => {
        if (typeof replacer === "function")
          value2 = replacer.call(obj, key, value2);
        else if (Array.isArray(replacer) && !replacer.includes(key))
          return;
        if (value2 !== void 0 || keepUndefined)
          map2.items.push(Pair.createPair(key, value2, ctx));
      };
      if (obj instanceof Map) {
        for (const [key, value2] of obj)
          add(key, value2);
      } else if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj))
          add(key, obj[key]);
      }
      if (typeof schema.sortMapEntries === "function") {
        map2.items.sort(schema.sortMapEntries);
      }
      return map2;
    }
    var map = {
      collection: "map",
      createNode: createMap,
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!Node.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      }
    };
    exports.map = map;
  }
});

// node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLSeq.js"(exports) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var Node = require_Node();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      constructor(schema) {
        super(Node.SEQ, schema);
        this.items = [];
      }
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      add(value2) {
        this.items.push(value2);
      }
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && Node.isScalar(it) ? it.value : it;
      }
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      set(key, value2) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (Node.isScalar(prev) && Scalar.isScalarValue(value2))
          prev.value = value2;
        else
          this.items[idx] = value2;
      }
      toJSON(_2, ctx) {
        const seq = [];
        if (ctx == null ? void 0 : ctx.onCreate)
          ctx.onCreate(seq);
        let i2 = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i2++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
    };
    function asItemIndex(key) {
      let idx = Node.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});

// node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "node_modules/yaml/dist/schema/common/seq.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var Node = require_Node();
    var YAMLSeq = require_YAMLSeq();
    function createSeq(schema, obj, ctx) {
      const { replacer } = ctx;
      const seq2 = new YAMLSeq.YAMLSeq(schema);
      if (obj && Symbol.iterator in Object(obj)) {
        let i2 = 0;
        for (let it of obj) {
          if (typeof replacer === "function") {
            const key = obj instanceof Set ? it : String(i2++);
            it = replacer.call(obj, key, it);
          }
          seq2.items.push(createNode.createNode(it, void 0, ctx));
        }
      }
      return seq2;
    }
    var seq = {
      collection: "seq",
      createNode: createSeq,
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!Node.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      }
    };
    exports.seq = seq;
  }
});

// node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "node_modules/yaml/dist/schema/common/string.js"(exports) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value2) => typeof value2 === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string;
  }
});

// node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "node_modules/yaml/dist/schema/common/null.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value2) => value2 == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports.nullTag = nullTag;
  }
});

// node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "node_modules/yaml/dist/schema/core/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value2) => typeof value2 === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value: value2 }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value2 === sv)
            return source;
        }
        return value2 ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});

// node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyNumber.js"(exports) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value: value2 }) {
      if (typeof value2 === "bigint")
        return String(value2);
      const num = typeof value2 === "number" ? value2 : Number(value2);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = JSON.stringify(value2);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
        let i2 = n.indexOf(".");
        if (i2 < 0) {
          i2 = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i2 - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});

// node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "node_modules/yaml/dist/schema/core/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value2) => typeof value2 === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value2) => typeof value2 === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value2) => typeof value2 === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "node_modules/yaml/dist/schema/core/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value2) => typeof value2 === "bigint" || Number.isInteger(value2);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value: value2 } = node;
      if (intIdentify(value2) && value2 >= 0)
        return prefix + value2.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value2) => intIdentify(value2) && value2 >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value2) => intIdentify(value2) && value2 >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "node_modules/yaml/dist/schema/core/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "node_modules/yaml/dist/schema/json/schema.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value2) {
      return typeof value2 === "bigint" || Number.isInteger(value2);
    }
    var stringifyJSON = ({ value: value2 }) => JSON.stringify(value2);
    var jsonScalars = [
      {
        identify: (value2) => typeof value2 === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value2) => value2 == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value2) => typeof value2 === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true|false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value: value2 }) => intIdentify(value2) ? value2.toString() : JSON.stringify(value2)
      },
      {
        identify: (value2) => typeof value2 === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value2) => value2 instanceof Uint8Array,
      default: false,
      tag: "tag:yaml.org,2002:binary",
      resolve(src, onError) {
        if (typeof Buffer === "function") {
          return Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i2 = 0; i2 < str.length; ++i2)
            buffer[i2] = str.charCodeAt(i2);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value: value2 }, ctx, onComment, onChompKeep) {
        const buf = value2;
        let str;
        if (typeof Buffer === "function") {
          str = buf instanceof Buffer ? buf.toString("base64") : Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s3 = "";
          for (let i2 = 0; i2 < buf.length; ++i2)
            s3 += String.fromCharCode(buf[i2]);
          str = btoa(s3);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        if (!type)
          type = Scalar.Scalar.BLOCK_LITERAL;
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i2 = 0, o = 0; i2 < n; ++i2, o += lineWidth) {
            lines[i2] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports) {
    "use strict";
    var Node = require_Node();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (Node.isSeq(seq)) {
        for (let i2 = 0; i2 < seq.items.length; ++i2) {
          let item = seq.items[i2];
          if (Node.isPair(item))
            continue;
          else if (Node.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i2] = Node.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i2 = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i2++), it);
          let key, value2;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value2 = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value2 = it[key];
            } else
              throw new TypeError(`Expected { key: value } tuple: ${it}`);
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value2, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var toJS = require_toJS();
    var Node = require_Node();
    var YAMLMap = require_YAMLMap();
    var pairs = require_pairs();
    var YAMLOMap = class extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = YAMLOMap.tag;
      }
      toJSON(_2, ctx) {
        if (!ctx)
          return super.toJSON(_2);
        const map = /* @__PURE__ */ new Map();
        if (ctx == null ? void 0 : ctx.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value2;
          if (Node.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value2 = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value2);
        }
        return map;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value2) => value2 instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (Node.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new YAMLOMap();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value: value2, source }, ctx) {
      const boolObj = value2 ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value2 ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value2) => value2 === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value2) => value2 === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value2) => typeof value2 === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value2) => typeof value2 === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value2) => typeof value2 === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f3 = str.substring(dot + 1).replace(/_/g, "");
          if (f3[f3.length - 1] === "0")
            node.minFractionDigits = f3.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value2) => typeof value2 === "bigint" || Number.isInteger(value2);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value: value2 } = node;
      if (intIdentify(value2)) {
        const str = value2.toString(radix);
        return value2 < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports) {
    "use strict";
    var Node = require_Node();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (Node.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && Node.isPair(pair) ? Node.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value2) {
        if (typeof value2 !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value2}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value2) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value2) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_2, ctx) {
        return super.toJSON(_2, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value2) => value2 instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      resolve(map, onError) {
        if (Node.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      },
      createNode(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new YAMLSet(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value2 of iterable) {
            if (typeof replacer === "function")
              value2 = replacer.call(iterable, value2, value2);
            set2.items.push(Pair.createPair(value2, null, ctx));
          }
        return set2;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value: value2 } = node;
      let num = (n) => n;
      if (typeof value2 === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value2) || !isFinite(value2))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value2 < 0) {
        sign = "-";
        value2 *= num(-1);
      }
      const _60 = num(60);
      const parts = [value2 % _60];
      if (value2 < 60) {
        parts.unshift(0);
      } else {
        value2 = (value2 - parts[0]) / _60;
        parts.unshift(value2 % _60);
        if (value2 >= 60) {
          value2 = (value2 - parts[0]) / _60;
          parts.unshift(value2);
        }
      }
      return sign + parts.map((n) => n < 10 ? "0" + String(n) : String(n)).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value2) => typeof value2 === "bigint" || Number.isInteger(value2),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value2) => typeof value2 === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value2) => value2 instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value: value2 }) => value2.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "node_modules/yaml/dist/schema/tags.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName) {
      let tags = schemas.get(schemaName);
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      return tags.map((tag) => {
        if (typeof tag !== "string")
          return tag;
        const tagObj = tagsByName[tag];
        if (tagObj)
          return tagObj;
        const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
      });
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});

// node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "node_modules/yaml/dist/schema/Schema.js"(exports) {
    "use strict";
    var Node = require_Node();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema2 = class {
      constructor({ compat, customTags, merge: merge3, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.merge = !!merge3;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, Node.MAP, { value: map.map });
        Object.defineProperty(this, Node.SCALAR, { value: string.string });
        Object.defineProperty(this, Node.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(Schema2.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports.Schema = Schema2;
  }
});

// node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyDocument.js"(exports) {
    "use strict";
    var Node = require_Node();
    var stringify2 = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options2) {
      var _a6;
      const lines = [];
      let hasDirectives = options2.directives === true;
      if (options2.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify2.createStringifyContext(doc, options2);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (Node.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify2.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify2.stringify(doc.contents, ctx));
      }
      if ((_a6 = doc.directives) == null ? void 0 : _a6.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});

// node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "node_modules/yaml/dist/doc/applyReviver.js"(exports) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i2 = 0, len = val.length; i2 < len; ++i2) {
            const v0 = val[i2];
            const v1 = applyReviver(reviver, val, String(i2), v0);
            if (v1 === void 0)
              delete val[i2];
            else if (v1 !== v0)
              val[i2] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});

// node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "node_modules/yaml/dist/doc/Document.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var Node = require_Node();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema2 = require_Schema();
    var stringify2 = require_stringify();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class {
      constructor(value2, replacer, options2) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, Node.NODE_TYPE, { value: Node.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options2 === void 0 && replacer) {
          options2 = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          uniqueKeys: true,
          version: "1.2"
        }, options2);
        this.options = opt;
        let { version } = opt;
        if (options2 == null ? void 0 : options2._directives) {
          this.directives = options2._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options2);
        if (value2 === void 0)
          this.contents = null;
        else {
          this.contents = this.createNode(value2, _replacer, options2);
        }
      }
      clone() {
        const copy = Object.create(Document.prototype, {
          [Node.NODE_TYPE]: { value: Node.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = Node.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      add(value2) {
        if (assertCollection(this.contents))
          this.contents.add(value2);
      }
      addIn(path2, value2) {
        if (assertCollection(this.contents))
          this.contents.addIn(path2, value2);
      }
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value2, replacer, options2) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value2 = replacer.call({ "": value2 }, "", value2);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options2 === void 0 && replacer) {
          options2 = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options2 ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value2, tag, ctx);
        if (flow && Node.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      createPair(key, value2, options2 = {}) {
        const k = this.createNode(key, null, options2);
        const v = this.createNode(value2, null, options2);
        return new Pair.Pair(k, v);
      }
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      deleteIn(path2) {
        if (Collection.isEmptyPath(path2)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path2) : false;
      }
      get(key, keepScalar) {
        return Node.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      getIn(path2, keepScalar) {
        if (Collection.isEmptyPath(path2))
          return !keepScalar && Node.isScalar(this.contents) ? this.contents.value : this.contents;
        return Node.isCollection(this.contents) ? this.contents.getIn(path2, keepScalar) : void 0;
      }
      has(key) {
        return Node.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      hasIn(path2) {
        if (Collection.isEmptyPath(path2))
          return this.contents !== void 0;
        return Node.isCollection(this.contents) ? this.contents.hasIn(path2) : false;
      }
      set(key, value2) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value2);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value2);
        }
      }
      setIn(path2, value2) {
        if (Collection.isEmptyPath(path2))
          this.contents = value2;
        else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path2), value2);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path2, value2);
        }
      }
      setSchema(version, options2 = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { merge: true, resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { merge: false, resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options2.schema instanceof Object)
          this.schema = options2.schema;
        else if (opt)
          this.schema = new Schema2.Schema(Object.assign(opt, options2));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      toJS({ json: json2, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json2,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100,
          stringify: stringify2.stringify
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      toString(options2 = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options2 && (!Number.isInteger(options2.indent) || Number(options2.indent) <= 0)) {
          const s3 = JSON.stringify(options2.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s3}`);
        }
        return stringifyDocument.stringifyDocument(this, options2);
      }
    };
    function assertCollection(contents) {
      if (Node.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});

// node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "node_modules/yaml/dist/errors.js"(exports) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name, pos, code2, message) {
        super();
        this.name = name;
        this.code = code2;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code2, message) {
        super("YAMLParseError", pos, code2, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code2, message) {
        super("YAMLWarning", pos, code2, message);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end && end.line === line && end.col > col) {
          count = Math.min(end.col - col, 80 - ci);
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});

// node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "node_modules/yaml/dist/compose/resolve-props.js"(exports) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let hasNewlineAfterProp = false;
      let reqSpace = false;
      let anchor = null;
      let tag = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        switch (token.type) {
          case "space":
            if (!flow && atNewline && indicator !== "doc-start" && token.source[0] === "	")
              onError(token, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              hasNewlineAfterProp = true;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = false;
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== ""))
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        hasNewlineAfterProp,
        anchor,
        tag,
        end,
        start: start ?? end
      };
    }
    exports.resolveProps = resolveProps;
  }
});

// node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "node_modules/yaml/dist/compose/util-contains-newline.js"(exports) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});

// node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent2, fc, onError) {
      if ((fc == null ? void 0 : fc.type) === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent2 && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});

// node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "node_modules/yaml/dist/compose/util-map-includes.js"(exports) {
    "use strict";
    var Node = require_Node();
    function mapIncludes(ctx, items, search2) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || Node.isScalar(a) && Node.isScalar(b) && a.value === b.value && !(a.value === "<<" && ctx.schema.merge);
      return items.some((pair) => isEqual(pair.key, search2));
    }
    exports.mapIncludes = mapIncludes;
  }
});

// node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-map.js"(exports) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError) {
      var _a6;
      const map = new YAMLMap.YAMLMap(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value: value2 } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? (sep == null ? void 0 : sep[0]),
          offset,
          onError,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.hasNewlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (((_a6 = keyProps.found) == null ? void 0 : _a6.indent) !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value2,
          offset: keyNode.range[2],
          onError,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if ((value2 == null ? void 0 : value2.type) === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value2 ? composeNode(ctx, value2, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value2, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});

// node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-seq.js"(exports) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError) {
      const seq = new YAMLSeq.YAMLSeq(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value: value2 } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value2,
          offset,
          onError,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value2) {
            if (value2 && value2.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value2 ? composeNode(ctx, value2, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value2, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});

// node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "node_modules/yaml/dist/compose/resolve-end.js"(exports) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports.resolveEnd = resolveEnd;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports) {
    "use strict";
    var Node = require_Node();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const coll = isMap ? new YAMLMap.YAMLMap(ctx.schema) : new YAMLSeq.YAMLSeq(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i2 = 0; i2 < fc.items.length; ++i2) {
        const collItem = fc.items[i2];
        const { start, key, sep, value: value2 } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? (sep == null ? void 0 : sep[0]),
          offset,
          onError,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value2) {
            if (i2 === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i2 < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i2 === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop:
              for (const st of start) {
                switch (st.type) {
                  case "comma":
                  case "space":
                    break;
                  case "comment":
                    prevItemComment = st.source.substring(1);
                    break loop;
                  default:
                    break loop;
                }
              }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (Node.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value2 ? composeNode(ctx, value2, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value2))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value2,
            offset: keyNode.range[2],
            onError,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value2) {
            if ("source" in value2 && value2.source && value2.source[0] === ":")
              onError(value2, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value2 ? composeNode(ctx, value2, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value2))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce && ce.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});

// node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "node_modules/yaml/dist/compose/compose-collection.js"(exports) {
    "use strict";
    var Node = require_Node();
    var Scalar = require_Scalar();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function composeCollection(CN, ctx, token, tagToken, onError) {
      let coll;
      switch (token.type) {
        case "block-map": {
          coll = resolveBlockMap.resolveBlockMap(CN, ctx, token, onError);
          break;
        }
        case "block-seq": {
          coll = resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError);
          break;
        }
        case "flow-collection": {
          coll = resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError);
          break;
        }
      }
      if (!tagToken)
        return coll;
      const tagName = ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      if (!tagName)
        return coll;
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      const expType = Node.isMap(coll) ? "map" : "seq";
      let tag = ctx.schema.tags.find((t2) => t2.collection === expType && t2.tag === tagName);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt && kt.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          coll.tag = tagName;
          return coll;
        }
      }
      const res = tag.resolve(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options);
      const node = Node.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag == null ? void 0 : tag.format)
        node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});

// node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(scalar, strict, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i2 = lines.length - 1; i2 >= 0; --i2) {
        const content = lines[i2][1];
        if (content === "" || content === "\r")
          chompStart = i2;
        else
          break;
      }
      if (chompStart === 0) {
        const value3 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value3, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i2 = 0; i2 < chompStart; ++i2) {
        const [indent2, content] = lines[i2];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent2.length > trimIndent)
            trimIndent = indent2.length;
        } else {
          if (indent2.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent2.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent2.length;
          contentStart = i2;
          break;
        }
        offset += indent2.length + content.length + 1;
      }
      for (let i2 = lines.length - 1; i2 >= chompStart; --i2) {
        if (lines[i2][0].length > trimIndent)
          chompStart = i2 + 1;
      }
      let value2 = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i2 = 0; i2 < contentStart; ++i2)
        value2 += lines[i2][0].slice(trimIndent) + "\n";
      for (let i2 = contentStart; i2 < chompStart; ++i2) {
        let [indent2, content] = lines[i2];
        offset += indent2.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent2.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent2 = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value2 += sep + indent2.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent2.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value2 += sep + indent2.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value2 += "\n";
          else
            sep = "\n";
        } else {
          value2 += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i2 = chompStart; i2 < lines.length; ++i2)
            value2 += "\n" + lines[i2][0].slice(trimIndent);
          if (value2[value2.length - 1] !== "\n")
            value2 += "\n";
          break;
        default:
          value2 += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value: value2, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent2 = 0;
      let chomp = "";
      let error = -1;
      for (let i2 = 1; i2 < source.length; ++i2) {
        const ch = source[i2];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent2 && n)
            indent2 = n;
          else if (error === -1)
            error = offset + i2;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i2 = 1; i2 < props.length; ++i2) {
        const token = props[i2];
        switch (token.type) {
          case "space":
            hasSpace = true;
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts2 = token.source;
            if (ts2 && typeof ts2 === "string")
              length += ts2.length;
          }
        }
      }
      return { mode, indent: indent2, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m2 = first.match(/^( *)/);
      const line0 = (m2 == null ? void 0 : m2[1]) ? [m2[1], first.slice(m2[1].length)] : ["", first];
      const lines = [line0];
      for (let i2 = 1; i2 < split.length; i2 += 2)
        lines.push([split[i2], split[i2 + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type2;
      let value2;
      const _onError = (rel, code2, msg) => onError(offset + rel, code2, msg);
      switch (type) {
        case "scalar":
          _type2 = Scalar.Scalar.PLAIN;
          value2 = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type2 = Scalar.Scalar.QUOTE_SINGLE;
          value2 = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type2 = Scalar.Scalar.QUOTE_DOUBLE;
          value2 = doubleQuotedValue(source, _onError);
          break;
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value: value2,
        type: _type2,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return foldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function foldLines(source) {
      let first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch (_2) {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
      }
      let match = first.exec(source);
      if (!match)
        return source;
      let res = match[1];
      let sep = " ";
      let pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + ((match == null ? void 0 : match[1]) ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i2 = 1; i2 < source.length - 1; ++i2) {
        const ch = source[i2];
        if (ch === "\r" && source[i2 + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i2);
          res += fold;
          i2 = offset;
        } else if (ch === "\\") {
          let next = source[++i2];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i2 + 1];
            while (next === " " || next === "	")
              next = source[++i2 + 1];
          } else if (next === "\r" && source[i2 + 1] === "\n") {
            next = source[++i2 + 1];
            while (next === " " || next === "	")
              next = source[++i2 + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = { x: 2, u: 4, U: 8 }[next];
            res += parseCharCode(source, i2 + 1, length, onError);
            i2 += length;
          } else {
            const raw = source.substr(i2 - 1, 2);
            onError(i2 - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i2;
          let next = source[i2 + 1];
          while (next === " " || next === "	")
            next = source[++i2 + 1];
          if (next !== "\n" && !(next === "\r" && source[i2 + 2] === "\n"))
            res += i2 > wsStart ? source.slice(wsStart, i2 + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      a: "\x07",
      b: "\b",
      e: "\x1B",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	",
      v: "\v",
      N: "\x85",
      _: "\xA0",
      L: "\u2028",
      P: "\u2029",
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok2 = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code2 = ok2 ? parseInt(cc, 16) : NaN;
      if (isNaN(code2)) {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
      return String.fromCodePoint(code2);
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});

// node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "node_modules/yaml/dist/compose/compose-scalar.js"(exports) {
    "use strict";
    var Node = require_Node();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value: value2, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(token, ctx.options.strict, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      const tag = tagToken && tagName ? findScalarTagByName(ctx.schema, value2, tagName, tagToken, onError) : token.type === "scalar" ? findScalarTagByTest(ctx, value2, token, onError) : ctx.schema[Node.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value2, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = Node.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value2);
      }
      scalar.range = range;
      scalar.source = value2;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value2, tagName, tagToken, onError) {
      var _a6;
      if (tagName === "!")
        return schema[Node.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if ((_a6 = tag.test) == null ? void 0 : _a6.test(value2))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[Node.SCALAR];
    }
    function findScalarTagByTest({ directives, schema }, value2, token, onError) {
      const tag = schema.tags.find((tag2) => {
        var _a6;
        return tag2.default && ((_a6 = tag2.test) == null ? void 0 : _a6.test(value2));
      }) || schema[Node.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => {
          var _a6;
          return tag2.default && ((_a6 = tag2.test) == null ? void 0 : _a6.test(value2));
        }) ?? schema[Node.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts2 = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts2} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});

// node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        if (pos === null)
          pos = before.length;
        for (let i2 = pos - 1; i2 >= 0; --i2) {
          let st = before[i2];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i2];
          while ((st == null ? void 0 : st.type) === "space") {
            offset += st.source.length;
            st = before[++i2];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});

// node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "node_modules/yaml/dist/compose/compose-node.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          node = composeCollection.composeCollection(CN, ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
          isSrcToken = false;
        }
      }
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options: options2 }, { offset, source, end }, onError) {
      const alias2 = new Alias.Alias(source.substring(1));
      if (alias2.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias2.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options2.strict, onError);
      alias2.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias2.comment = re.comment;
      return alias2;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});

// node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "node_modules/yaml/dist/compose/compose-doc.js"(exports) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options2, directives, { offset, start, value: value2, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options2);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value2 ?? (end == null ? void 0 : end[0]),
        offset,
        onError,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value2 && (value2.type === "block-map" || value2.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value2 ? composeNode.composeNode(ctx, value2, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});

// node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "node_modules/yaml/dist/compose/composer.js"(exports) {
    "use strict";
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var Node = require_Node();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      var _a6;
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i2 = 0; i2 < prelude.length; ++i2) {
        const source = prelude[i2];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (((_a6 = prelude[i2 + 1]) == null ? void 0 : _a6[0]) !== "#")
              i2 += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options2 = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code2, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code2, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code2, message));
        };
        this.directives = new directives.Directives({ version: options2.version || "1.2" });
        this.options = options2;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (Node.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (Node.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          Array.prototype.push.apply(doc.errors, this.errors);
          Array.prototype.push.apply(doc.warnings, this.warnings);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      *next(token) {
        if (process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports.Composer = Composer;
  }
});

// node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "node_modules/yaml/dist/parse/cst-scalar.js"(exports) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code2, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code2, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code2, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar(token, strict, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value2, context) {
      const { implicitKey = false, indent: indent2, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value: value2 }, {
        implicitKey,
        indent: indent2 > 0 ? " ".repeat(indent2) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent: indent2, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent: indent2, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent: indent2, source: "\n" });
          return { type: "block-scalar", offset, indent: indent2, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent: indent2, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent: indent2, source, end };
        default:
          return { type: "scalar", offset, indent: indent2, source, end };
      }
    }
    function setScalarValue(token, value2, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent2 = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent2 === "number")
        indent2 += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value: value2 }, {
        implicitKey: implicitKey || indent2 === null,
        indent: indent2 !== null && indent2 > 0 ? " ".repeat(indent2) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent2 = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent: indent2, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent: indent2, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent: indent2, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent2 = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent: indent2, source, end });
        }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});

// node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "node_modules/yaml/dist/parse/cst-stringify.js"(exports) {
    "use strict";
    var stringify2 = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep, value: value2 }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value2)
        res += stringifyToken(value2);
      return res;
    }
    exports.stringify = stringify2;
  }
});

// node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "node_modules/yaml/dist/parse/cst-visit.js"(exports) {
    "use strict";
    var BREAK = Symbol("break visit");
    var SKIP2 = Symbol("skip children");
    var REMOVE = Symbol("remove item");
    function visit2(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit2.BREAK = BREAK;
    visit2.SKIP = SKIP2;
    visit2.REMOVE = REMOVE;
    visit2.itemAtPath = (cst, path2) => {
      let item = cst;
      for (const [field, index] of path2) {
        const tok = item == null ? void 0 : item[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit2.parentCollection = (cst, path2) => {
      const parent = visit2.itemAtPath(cst, path2.slice(0, -1));
      const field = path2[path2.length - 1][0];
      const coll = parent == null ? void 0 : parent[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path2, item, visitor) {
      let ctrl = visitor(item, path2);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i2 = 0; i2 < token.items.length; ++i2) {
            const ci = _visit(Object.freeze(path2.concat([[field, i2]])), token.items[i2], visitor);
            if (typeof ci === "number")
              i2 = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i2, 1);
              i2 -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path2);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path2) : ctrl;
    }
    exports.visit = visit2;
  }
});

// node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "node_modules/yaml/dist/parse/cst.js"(exports) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection;
    exports.isScalar = isScalar;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});

// node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "node_modules/yaml/dist/parse/lexer.js"(exports) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = "0123456789ABCDEFabcdef".split("");
    var tagChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split("");
    var invalidFlowScalarChars = ",[]{}".split("");
    var invalidAnchorChars = " ,[]{}\n\r	".split("");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.includes(ch);
    var Lexer2 = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      *lex(source, incomplete = false) {
        if (source) {
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i2 = this.pos;
        let ch = this.buffer[i2];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i2];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i2 + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent2 = 0;
          while (ch === " ")
            ch = this.buffer[++indent2 + offset];
          if (ch === "\r") {
            const next = this.buffer[indent2 + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent2 + 1;
          }
          return ch === "\n" || indent2 >= this.indentNext || !ch && !this.atEnd ? offset + indent2 : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          const cs = line.indexOf("#");
          if (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	")
              dirEnd = cs - 1;
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s3 = this.peek(3);
          if (s3 === "---" && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return "doc";
          } else if (s3 === "..." && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            return "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return yield* this.parseBlockStart();
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent2 = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent2 = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent2 !== -1 && indent2 < this.indentNext && line[0] !== "#" || indent2 === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent2 === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i2 = this.pos;
        while (true) {
          const ch = this.buffer[++i2];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent2 = 0;
        let ch;
        loop:
          for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
            switch (ch) {
              case " ":
                indent2 += 1;
                break;
              case "\n":
                nl = i2;
                indent2 = 0;
                break;
              case "\r": {
                const next = this.buffer[i2 + 1];
                if (!next && !this.atEnd)
                  return this.setNext("block-scalar");
                if (next === "\n")
                  break;
              }
              default:
                break loop;
            }
          }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent2 >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent2;
          else
            this.indentNext += this.blockScalarIndent;
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        if (!this.blockScalarKeep) {
          do {
            let i2 = nl - 1;
            let ch2 = this.buffer[i2];
            if (ch2 === "\r")
              ch2 = this.buffer[--i2];
            const lastChar = i2;
            while (ch2 === " " || ch2 === "	")
              ch2 = this.buffer[--i2];
            if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent2 > lastChar)
              nl = i2;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i2 = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i2]) {
          if (ch === ":") {
            const next = this.buffer[i2 + 1];
            if (isEmpty(next) || inFlow && next === ",")
              break;
            end = i2;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i2 + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i2 += 1;
                ch = "\n";
                next = this.buffer[i2 + 1];
              } else
                end = i2;
            }
            if (next === "#" || inFlow && invalidFlowScalarChars.includes(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i2 + 1);
              if (cs === -1)
                break;
              i2 = Math.max(i2, cs - 2);
            }
          } else {
            if (inFlow && invalidFlowScalarChars.includes(ch))
              break;
            end = i2;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i2, allowEmpty) {
        const s3 = this.buffer.slice(this.pos, i2);
        if (s3) {
          yield s3;
          this.pos += s3.length;
          return s3.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        switch (this.charAt(0)) {
          case "!":
            return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "&":
            return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "-":
          case "?":
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || inFlow && invalidFlowScalarChars.includes(ch1)) {
              if (!inFlow)
                this.indentNext = this.indentValue + 1;
              else if (this.flowKey)
                this.flowKey = false;
              return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
            }
          }
        }
        return 0;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i2 = this.pos + 2;
          let ch = this.buffer[i2];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i2];
          return yield* this.pushToIndex(ch === ">" ? i2 + 1 : i2, false);
        } else {
          let i2 = this.pos + 1;
          let ch = this.buffer[i2];
          while (ch) {
            if (tagChars.includes(ch))
              ch = this.buffer[++i2];
            else if (ch === "%" && hexDigits.includes(this.buffer[i2 + 1]) && hexDigits.includes(this.buffer[i2 + 2])) {
              ch = this.buffer[i2 += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i2, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i2 = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i2];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i2 - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i2;
        }
        return n;
      }
      *pushUntil(test) {
        let i2 = this.pos;
        let ch = this.buffer[i2];
        while (!test(ch))
          ch = this.buffer[++i2];
        return yield* this.pushToIndex(i2, false);
      }
    };
    exports.Lexer = Lexer2;
  }
});

// node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "node_modules/yaml/dist/parse/line-counter.js"(exports) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports.LineCounter = LineCounter;
  }
});

// node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "node_modules/yaml/dist/parse/parser.js"(exports) {
    "use strict";
    var cst = require_cst();
    var lexer2 = require_lexer();
    function includesToken(list, type) {
      for (let i2 = 0; i2 < list.length; ++i2)
        if (list[i2].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i2 = 0; i2 < list.length; ++i2) {
        switch (list[i2].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i2;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token == null ? void 0 : token.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      var _a6;
      if (prev.length === 0)
        return [];
      let i2 = prev.length;
      loop:
        while (--i2 >= 0) {
          switch (prev[i2].type) {
            case "doc-start":
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
            case "newline":
              break loop;
          }
        }
      while (((_a6 = prev[++i2]) == null ? void 0 : _a6.type) === "space") {
      }
      return prev.splice(i2, prev.length);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                Array.prototype.push.apply(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              Array.prototype.push.apply(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser2 = class {
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer2.Lexer();
        this.onNewLine = onNewLine;
      }
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      *next(source) {
        this.source = source;
        if (process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && (!top || top.type !== "doc-end")) {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !includesToken(it.start, "explicit-key-ind");
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        var _a6;
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if ((last == null ? void 0 : last.type) === "comment")
                end == null ? void 0 : end.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = (_a6 = prev == null ? void 0 : prev.value) == null ? void 0 : _a6.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atNextItem = !this.onKeyLine && this.indent === map.indent && it.sep;
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i2 = 0; i2 < it.sep.length; ++i2) {
              const st = it.sep[i2];
              switch (st.type) {
                case "newline":
                  nl.push(i2);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !includesToken(it.start, "explicit-key-ind")) {
                it.start.push(this.sourceToken);
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken] }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (includesToken(it.start, "explicit-key-ind")) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key, delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs6 = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs6, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs6);
              } else {
                Object.assign(it, { key: fs6, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (atNextItem && bv.type !== "block-seq" && includesToken(it.start, "explicit-key-ind")) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        var _a6;
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if ((last == null ? void 0 : last.type) === "comment")
                end == null ? void 0 : end.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = (_a6 = prev == null ? void 0 : prev.value) == null ? void 0 : _a6.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top && top.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs6 = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs6, sep: [] });
              else if (it.sep)
                this.stack.push(fs6);
              else
                Object.assign(it, { key: fs6, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent2) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent2)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports.Parser = Parser2;
  }
});

// node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "node_modules/yaml/dist/public-api.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var lineCounter = require_line_counter();
    var parser2 = require_parser();
    function parseOptions(options2) {
      const prettyErrors = options2.prettyErrors !== false;
      const lineCounter$1 = options2.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options2 = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options2);
      const parser$1 = new parser2.Parser(lineCounter2 == null ? void 0 : lineCounter2.addNewLine);
      const composer$1 = new composer.Composer(options2);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options2 = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options2);
      const parser$1 = new parser2.Parser(lineCounter2 == null ? void 0 : lineCounter2.addNewLine);
      const composer$1 = new composer.Composer(options2);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse4(src, reviver, options2) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options2 === void 0 && reviver && typeof reviver === "object") {
        options2 = reviver;
      }
      const doc = parseDocument(src, options2);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options2));
    }
    function stringify2(value2, replacer, options2) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options2 === void 0 && replacer) {
        options2 = replacer;
      }
      if (typeof options2 === "string")
        options2 = options2.length;
      if (typeof options2 === "number") {
        const indent2 = Math.round(options2);
        options2 = indent2 < 1 ? void 0 : indent2 > 8 ? { indent: 8 } : { indent: indent2 };
      }
      if (value2 === void 0) {
        const { keepUndefined } = options2 ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      return new Document.Document(value2, _replacer, options2).toString(options2);
    }
    exports.parse = parse4;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify2;
  }
});

// node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema2 = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var Node = require_Node();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer2 = require_lexer();
    var lineCounter = require_line_counter();
    var parser2 = require_parser();
    var publicApi = require_public_api();
    var visit2 = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema2.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = Node.isAlias;
    exports.isCollection = Node.isCollection;
    exports.isDocument = Node.isDocument;
    exports.isMap = Node.isMap;
    exports.isNode = Node.isNode;
    exports.isPair = Node.isPair;
    exports.isScalar = Node.isScalar;
    exports.isSeq = Node.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer2.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser2.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit2.visit;
    exports.visitAsync = visit2.visitAsync;
  }
});

// node_modules/character-entities/index.js
var characterEntities;
var init_character_entities = __esm({
  "node_modules/character-entities/index.js"() {
    characterEntities = {
      AElig: "\xC6",
      AMP: "&",
      Aacute: "\xC1",
      Abreve: "\u0102",
      Acirc: "\xC2",
      Acy: "\u0410",
      Afr: "\u{1D504}",
      Agrave: "\xC0",
      Alpha: "\u0391",
      Amacr: "\u0100",
      And: "\u2A53",
      Aogon: "\u0104",
      Aopf: "\u{1D538}",
      ApplyFunction: "\u2061",
      Aring: "\xC5",
      Ascr: "\u{1D49C}",
      Assign: "\u2254",
      Atilde: "\xC3",
      Auml: "\xC4",
      Backslash: "\u2216",
      Barv: "\u2AE7",
      Barwed: "\u2306",
      Bcy: "\u0411",
      Because: "\u2235",
      Bernoullis: "\u212C",
      Beta: "\u0392",
      Bfr: "\u{1D505}",
      Bopf: "\u{1D539}",
      Breve: "\u02D8",
      Bscr: "\u212C",
      Bumpeq: "\u224E",
      CHcy: "\u0427",
      COPY: "\xA9",
      Cacute: "\u0106",
      Cap: "\u22D2",
      CapitalDifferentialD: "\u2145",
      Cayleys: "\u212D",
      Ccaron: "\u010C",
      Ccedil: "\xC7",
      Ccirc: "\u0108",
      Cconint: "\u2230",
      Cdot: "\u010A",
      Cedilla: "\xB8",
      CenterDot: "\xB7",
      Cfr: "\u212D",
      Chi: "\u03A7",
      CircleDot: "\u2299",
      CircleMinus: "\u2296",
      CirclePlus: "\u2295",
      CircleTimes: "\u2297",
      ClockwiseContourIntegral: "\u2232",
      CloseCurlyDoubleQuote: "\u201D",
      CloseCurlyQuote: "\u2019",
      Colon: "\u2237",
      Colone: "\u2A74",
      Congruent: "\u2261",
      Conint: "\u222F",
      ContourIntegral: "\u222E",
      Copf: "\u2102",
      Coproduct: "\u2210",
      CounterClockwiseContourIntegral: "\u2233",
      Cross: "\u2A2F",
      Cscr: "\u{1D49E}",
      Cup: "\u22D3",
      CupCap: "\u224D",
      DD: "\u2145",
      DDotrahd: "\u2911",
      DJcy: "\u0402",
      DScy: "\u0405",
      DZcy: "\u040F",
      Dagger: "\u2021",
      Darr: "\u21A1",
      Dashv: "\u2AE4",
      Dcaron: "\u010E",
      Dcy: "\u0414",
      Del: "\u2207",
      Delta: "\u0394",
      Dfr: "\u{1D507}",
      DiacriticalAcute: "\xB4",
      DiacriticalDot: "\u02D9",
      DiacriticalDoubleAcute: "\u02DD",
      DiacriticalGrave: "`",
      DiacriticalTilde: "\u02DC",
      Diamond: "\u22C4",
      DifferentialD: "\u2146",
      Dopf: "\u{1D53B}",
      Dot: "\xA8",
      DotDot: "\u20DC",
      DotEqual: "\u2250",
      DoubleContourIntegral: "\u222F",
      DoubleDot: "\xA8",
      DoubleDownArrow: "\u21D3",
      DoubleLeftArrow: "\u21D0",
      DoubleLeftRightArrow: "\u21D4",
      DoubleLeftTee: "\u2AE4",
      DoubleLongLeftArrow: "\u27F8",
      DoubleLongLeftRightArrow: "\u27FA",
      DoubleLongRightArrow: "\u27F9",
      DoubleRightArrow: "\u21D2",
      DoubleRightTee: "\u22A8",
      DoubleUpArrow: "\u21D1",
      DoubleUpDownArrow: "\u21D5",
      DoubleVerticalBar: "\u2225",
      DownArrow: "\u2193",
      DownArrowBar: "\u2913",
      DownArrowUpArrow: "\u21F5",
      DownBreve: "\u0311",
      DownLeftRightVector: "\u2950",
      DownLeftTeeVector: "\u295E",
      DownLeftVector: "\u21BD",
      DownLeftVectorBar: "\u2956",
      DownRightTeeVector: "\u295F",
      DownRightVector: "\u21C1",
      DownRightVectorBar: "\u2957",
      DownTee: "\u22A4",
      DownTeeArrow: "\u21A7",
      Downarrow: "\u21D3",
      Dscr: "\u{1D49F}",
      Dstrok: "\u0110",
      ENG: "\u014A",
      ETH: "\xD0",
      Eacute: "\xC9",
      Ecaron: "\u011A",
      Ecirc: "\xCA",
      Ecy: "\u042D",
      Edot: "\u0116",
      Efr: "\u{1D508}",
      Egrave: "\xC8",
      Element: "\u2208",
      Emacr: "\u0112",
      EmptySmallSquare: "\u25FB",
      EmptyVerySmallSquare: "\u25AB",
      Eogon: "\u0118",
      Eopf: "\u{1D53C}",
      Epsilon: "\u0395",
      Equal: "\u2A75",
      EqualTilde: "\u2242",
      Equilibrium: "\u21CC",
      Escr: "\u2130",
      Esim: "\u2A73",
      Eta: "\u0397",
      Euml: "\xCB",
      Exists: "\u2203",
      ExponentialE: "\u2147",
      Fcy: "\u0424",
      Ffr: "\u{1D509}",
      FilledSmallSquare: "\u25FC",
      FilledVerySmallSquare: "\u25AA",
      Fopf: "\u{1D53D}",
      ForAll: "\u2200",
      Fouriertrf: "\u2131",
      Fscr: "\u2131",
      GJcy: "\u0403",
      GT: ">",
      Gamma: "\u0393",
      Gammad: "\u03DC",
      Gbreve: "\u011E",
      Gcedil: "\u0122",
      Gcirc: "\u011C",
      Gcy: "\u0413",
      Gdot: "\u0120",
      Gfr: "\u{1D50A}",
      Gg: "\u22D9",
      Gopf: "\u{1D53E}",
      GreaterEqual: "\u2265",
      GreaterEqualLess: "\u22DB",
      GreaterFullEqual: "\u2267",
      GreaterGreater: "\u2AA2",
      GreaterLess: "\u2277",
      GreaterSlantEqual: "\u2A7E",
      GreaterTilde: "\u2273",
      Gscr: "\u{1D4A2}",
      Gt: "\u226B",
      HARDcy: "\u042A",
      Hacek: "\u02C7",
      Hat: "^",
      Hcirc: "\u0124",
      Hfr: "\u210C",
      HilbertSpace: "\u210B",
      Hopf: "\u210D",
      HorizontalLine: "\u2500",
      Hscr: "\u210B",
      Hstrok: "\u0126",
      HumpDownHump: "\u224E",
      HumpEqual: "\u224F",
      IEcy: "\u0415",
      IJlig: "\u0132",
      IOcy: "\u0401",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Icy: "\u0418",
      Idot: "\u0130",
      Ifr: "\u2111",
      Igrave: "\xCC",
      Im: "\u2111",
      Imacr: "\u012A",
      ImaginaryI: "\u2148",
      Implies: "\u21D2",
      Int: "\u222C",
      Integral: "\u222B",
      Intersection: "\u22C2",
      InvisibleComma: "\u2063",
      InvisibleTimes: "\u2062",
      Iogon: "\u012E",
      Iopf: "\u{1D540}",
      Iota: "\u0399",
      Iscr: "\u2110",
      Itilde: "\u0128",
      Iukcy: "\u0406",
      Iuml: "\xCF",
      Jcirc: "\u0134",
      Jcy: "\u0419",
      Jfr: "\u{1D50D}",
      Jopf: "\u{1D541}",
      Jscr: "\u{1D4A5}",
      Jsercy: "\u0408",
      Jukcy: "\u0404",
      KHcy: "\u0425",
      KJcy: "\u040C",
      Kappa: "\u039A",
      Kcedil: "\u0136",
      Kcy: "\u041A",
      Kfr: "\u{1D50E}",
      Kopf: "\u{1D542}",
      Kscr: "\u{1D4A6}",
      LJcy: "\u0409",
      LT: "<",
      Lacute: "\u0139",
      Lambda: "\u039B",
      Lang: "\u27EA",
      Laplacetrf: "\u2112",
      Larr: "\u219E",
      Lcaron: "\u013D",
      Lcedil: "\u013B",
      Lcy: "\u041B",
      LeftAngleBracket: "\u27E8",
      LeftArrow: "\u2190",
      LeftArrowBar: "\u21E4",
      LeftArrowRightArrow: "\u21C6",
      LeftCeiling: "\u2308",
      LeftDoubleBracket: "\u27E6",
      LeftDownTeeVector: "\u2961",
      LeftDownVector: "\u21C3",
      LeftDownVectorBar: "\u2959",
      LeftFloor: "\u230A",
      LeftRightArrow: "\u2194",
      LeftRightVector: "\u294E",
      LeftTee: "\u22A3",
      LeftTeeArrow: "\u21A4",
      LeftTeeVector: "\u295A",
      LeftTriangle: "\u22B2",
      LeftTriangleBar: "\u29CF",
      LeftTriangleEqual: "\u22B4",
      LeftUpDownVector: "\u2951",
      LeftUpTeeVector: "\u2960",
      LeftUpVector: "\u21BF",
      LeftUpVectorBar: "\u2958",
      LeftVector: "\u21BC",
      LeftVectorBar: "\u2952",
      Leftarrow: "\u21D0",
      Leftrightarrow: "\u21D4",
      LessEqualGreater: "\u22DA",
      LessFullEqual: "\u2266",
      LessGreater: "\u2276",
      LessLess: "\u2AA1",
      LessSlantEqual: "\u2A7D",
      LessTilde: "\u2272",
      Lfr: "\u{1D50F}",
      Ll: "\u22D8",
      Lleftarrow: "\u21DA",
      Lmidot: "\u013F",
      LongLeftArrow: "\u27F5",
      LongLeftRightArrow: "\u27F7",
      LongRightArrow: "\u27F6",
      Longleftarrow: "\u27F8",
      Longleftrightarrow: "\u27FA",
      Longrightarrow: "\u27F9",
      Lopf: "\u{1D543}",
      LowerLeftArrow: "\u2199",
      LowerRightArrow: "\u2198",
      Lscr: "\u2112",
      Lsh: "\u21B0",
      Lstrok: "\u0141",
      Lt: "\u226A",
      Map: "\u2905",
      Mcy: "\u041C",
      MediumSpace: "\u205F",
      Mellintrf: "\u2133",
      Mfr: "\u{1D510}",
      MinusPlus: "\u2213",
      Mopf: "\u{1D544}",
      Mscr: "\u2133",
      Mu: "\u039C",
      NJcy: "\u040A",
      Nacute: "\u0143",
      Ncaron: "\u0147",
      Ncedil: "\u0145",
      Ncy: "\u041D",
      NegativeMediumSpace: "\u200B",
      NegativeThickSpace: "\u200B",
      NegativeThinSpace: "\u200B",
      NegativeVeryThinSpace: "\u200B",
      NestedGreaterGreater: "\u226B",
      NestedLessLess: "\u226A",
      NewLine: "\n",
      Nfr: "\u{1D511}",
      NoBreak: "\u2060",
      NonBreakingSpace: "\xA0",
      Nopf: "\u2115",
      Not: "\u2AEC",
      NotCongruent: "\u2262",
      NotCupCap: "\u226D",
      NotDoubleVerticalBar: "\u2226",
      NotElement: "\u2209",
      NotEqual: "\u2260",
      NotEqualTilde: "\u2242\u0338",
      NotExists: "\u2204",
      NotGreater: "\u226F",
      NotGreaterEqual: "\u2271",
      NotGreaterFullEqual: "\u2267\u0338",
      NotGreaterGreater: "\u226B\u0338",
      NotGreaterLess: "\u2279",
      NotGreaterSlantEqual: "\u2A7E\u0338",
      NotGreaterTilde: "\u2275",
      NotHumpDownHump: "\u224E\u0338",
      NotHumpEqual: "\u224F\u0338",
      NotLeftTriangle: "\u22EA",
      NotLeftTriangleBar: "\u29CF\u0338",
      NotLeftTriangleEqual: "\u22EC",
      NotLess: "\u226E",
      NotLessEqual: "\u2270",
      NotLessGreater: "\u2278",
      NotLessLess: "\u226A\u0338",
      NotLessSlantEqual: "\u2A7D\u0338",
      NotLessTilde: "\u2274",
      NotNestedGreaterGreater: "\u2AA2\u0338",
      NotNestedLessLess: "\u2AA1\u0338",
      NotPrecedes: "\u2280",
      NotPrecedesEqual: "\u2AAF\u0338",
      NotPrecedesSlantEqual: "\u22E0",
      NotReverseElement: "\u220C",
      NotRightTriangle: "\u22EB",
      NotRightTriangleBar: "\u29D0\u0338",
      NotRightTriangleEqual: "\u22ED",
      NotSquareSubset: "\u228F\u0338",
      NotSquareSubsetEqual: "\u22E2",
      NotSquareSuperset: "\u2290\u0338",
      NotSquareSupersetEqual: "\u22E3",
      NotSubset: "\u2282\u20D2",
      NotSubsetEqual: "\u2288",
      NotSucceeds: "\u2281",
      NotSucceedsEqual: "\u2AB0\u0338",
      NotSucceedsSlantEqual: "\u22E1",
      NotSucceedsTilde: "\u227F\u0338",
      NotSuperset: "\u2283\u20D2",
      NotSupersetEqual: "\u2289",
      NotTilde: "\u2241",
      NotTildeEqual: "\u2244",
      NotTildeFullEqual: "\u2247",
      NotTildeTilde: "\u2249",
      NotVerticalBar: "\u2224",
      Nscr: "\u{1D4A9}",
      Ntilde: "\xD1",
      Nu: "\u039D",
      OElig: "\u0152",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Ocy: "\u041E",
      Odblac: "\u0150",
      Ofr: "\u{1D512}",
      Ograve: "\xD2",
      Omacr: "\u014C",
      Omega: "\u03A9",
      Omicron: "\u039F",
      Oopf: "\u{1D546}",
      OpenCurlyDoubleQuote: "\u201C",
      OpenCurlyQuote: "\u2018",
      Or: "\u2A54",
      Oscr: "\u{1D4AA}",
      Oslash: "\xD8",
      Otilde: "\xD5",
      Otimes: "\u2A37",
      Ouml: "\xD6",
      OverBar: "\u203E",
      OverBrace: "\u23DE",
      OverBracket: "\u23B4",
      OverParenthesis: "\u23DC",
      PartialD: "\u2202",
      Pcy: "\u041F",
      Pfr: "\u{1D513}",
      Phi: "\u03A6",
      Pi: "\u03A0",
      PlusMinus: "\xB1",
      Poincareplane: "\u210C",
      Popf: "\u2119",
      Pr: "\u2ABB",
      Precedes: "\u227A",
      PrecedesEqual: "\u2AAF",
      PrecedesSlantEqual: "\u227C",
      PrecedesTilde: "\u227E",
      Prime: "\u2033",
      Product: "\u220F",
      Proportion: "\u2237",
      Proportional: "\u221D",
      Pscr: "\u{1D4AB}",
      Psi: "\u03A8",
      QUOT: '"',
      Qfr: "\u{1D514}",
      Qopf: "\u211A",
      Qscr: "\u{1D4AC}",
      RBarr: "\u2910",
      REG: "\xAE",
      Racute: "\u0154",
      Rang: "\u27EB",
      Rarr: "\u21A0",
      Rarrtl: "\u2916",
      Rcaron: "\u0158",
      Rcedil: "\u0156",
      Rcy: "\u0420",
      Re: "\u211C",
      ReverseElement: "\u220B",
      ReverseEquilibrium: "\u21CB",
      ReverseUpEquilibrium: "\u296F",
      Rfr: "\u211C",
      Rho: "\u03A1",
      RightAngleBracket: "\u27E9",
      RightArrow: "\u2192",
      RightArrowBar: "\u21E5",
      RightArrowLeftArrow: "\u21C4",
      RightCeiling: "\u2309",
      RightDoubleBracket: "\u27E7",
      RightDownTeeVector: "\u295D",
      RightDownVector: "\u21C2",
      RightDownVectorBar: "\u2955",
      RightFloor: "\u230B",
      RightTee: "\u22A2",
      RightTeeArrow: "\u21A6",
      RightTeeVector: "\u295B",
      RightTriangle: "\u22B3",
      RightTriangleBar: "\u29D0",
      RightTriangleEqual: "\u22B5",
      RightUpDownVector: "\u294F",
      RightUpTeeVector: "\u295C",
      RightUpVector: "\u21BE",
      RightUpVectorBar: "\u2954",
      RightVector: "\u21C0",
      RightVectorBar: "\u2953",
      Rightarrow: "\u21D2",
      Ropf: "\u211D",
      RoundImplies: "\u2970",
      Rrightarrow: "\u21DB",
      Rscr: "\u211B",
      Rsh: "\u21B1",
      RuleDelayed: "\u29F4",
      SHCHcy: "\u0429",
      SHcy: "\u0428",
      SOFTcy: "\u042C",
      Sacute: "\u015A",
      Sc: "\u2ABC",
      Scaron: "\u0160",
      Scedil: "\u015E",
      Scirc: "\u015C",
      Scy: "\u0421",
      Sfr: "\u{1D516}",
      ShortDownArrow: "\u2193",
      ShortLeftArrow: "\u2190",
      ShortRightArrow: "\u2192",
      ShortUpArrow: "\u2191",
      Sigma: "\u03A3",
      SmallCircle: "\u2218",
      Sopf: "\u{1D54A}",
      Sqrt: "\u221A",
      Square: "\u25A1",
      SquareIntersection: "\u2293",
      SquareSubset: "\u228F",
      SquareSubsetEqual: "\u2291",
      SquareSuperset: "\u2290",
      SquareSupersetEqual: "\u2292",
      SquareUnion: "\u2294",
      Sscr: "\u{1D4AE}",
      Star: "\u22C6",
      Sub: "\u22D0",
      Subset: "\u22D0",
      SubsetEqual: "\u2286",
      Succeeds: "\u227B",
      SucceedsEqual: "\u2AB0",
      SucceedsSlantEqual: "\u227D",
      SucceedsTilde: "\u227F",
      SuchThat: "\u220B",
      Sum: "\u2211",
      Sup: "\u22D1",
      Superset: "\u2283",
      SupersetEqual: "\u2287",
      Supset: "\u22D1",
      THORN: "\xDE",
      TRADE: "\u2122",
      TSHcy: "\u040B",
      TScy: "\u0426",
      Tab: "	",
      Tau: "\u03A4",
      Tcaron: "\u0164",
      Tcedil: "\u0162",
      Tcy: "\u0422",
      Tfr: "\u{1D517}",
      Therefore: "\u2234",
      Theta: "\u0398",
      ThickSpace: "\u205F\u200A",
      ThinSpace: "\u2009",
      Tilde: "\u223C",
      TildeEqual: "\u2243",
      TildeFullEqual: "\u2245",
      TildeTilde: "\u2248",
      Topf: "\u{1D54B}",
      TripleDot: "\u20DB",
      Tscr: "\u{1D4AF}",
      Tstrok: "\u0166",
      Uacute: "\xDA",
      Uarr: "\u219F",
      Uarrocir: "\u2949",
      Ubrcy: "\u040E",
      Ubreve: "\u016C",
      Ucirc: "\xDB",
      Ucy: "\u0423",
      Udblac: "\u0170",
      Ufr: "\u{1D518}",
      Ugrave: "\xD9",
      Umacr: "\u016A",
      UnderBar: "_",
      UnderBrace: "\u23DF",
      UnderBracket: "\u23B5",
      UnderParenthesis: "\u23DD",
      Union: "\u22C3",
      UnionPlus: "\u228E",
      Uogon: "\u0172",
      Uopf: "\u{1D54C}",
      UpArrow: "\u2191",
      UpArrowBar: "\u2912",
      UpArrowDownArrow: "\u21C5",
      UpDownArrow: "\u2195",
      UpEquilibrium: "\u296E",
      UpTee: "\u22A5",
      UpTeeArrow: "\u21A5",
      Uparrow: "\u21D1",
      Updownarrow: "\u21D5",
      UpperLeftArrow: "\u2196",
      UpperRightArrow: "\u2197",
      Upsi: "\u03D2",
      Upsilon: "\u03A5",
      Uring: "\u016E",
      Uscr: "\u{1D4B0}",
      Utilde: "\u0168",
      Uuml: "\xDC",
      VDash: "\u22AB",
      Vbar: "\u2AEB",
      Vcy: "\u0412",
      Vdash: "\u22A9",
      Vdashl: "\u2AE6",
      Vee: "\u22C1",
      Verbar: "\u2016",
      Vert: "\u2016",
      VerticalBar: "\u2223",
      VerticalLine: "|",
      VerticalSeparator: "\u2758",
      VerticalTilde: "\u2240",
      VeryThinSpace: "\u200A",
      Vfr: "\u{1D519}",
      Vopf: "\u{1D54D}",
      Vscr: "\u{1D4B1}",
      Vvdash: "\u22AA",
      Wcirc: "\u0174",
      Wedge: "\u22C0",
      Wfr: "\u{1D51A}",
      Wopf: "\u{1D54E}",
      Wscr: "\u{1D4B2}",
      Xfr: "\u{1D51B}",
      Xi: "\u039E",
      Xopf: "\u{1D54F}",
      Xscr: "\u{1D4B3}",
      YAcy: "\u042F",
      YIcy: "\u0407",
      YUcy: "\u042E",
      Yacute: "\xDD",
      Ycirc: "\u0176",
      Ycy: "\u042B",
      Yfr: "\u{1D51C}",
      Yopf: "\u{1D550}",
      Yscr: "\u{1D4B4}",
      Yuml: "\u0178",
      ZHcy: "\u0416",
      Zacute: "\u0179",
      Zcaron: "\u017D",
      Zcy: "\u0417",
      Zdot: "\u017B",
      ZeroWidthSpace: "\u200B",
      Zeta: "\u0396",
      Zfr: "\u2128",
      Zopf: "\u2124",
      Zscr: "\u{1D4B5}",
      aacute: "\xE1",
      abreve: "\u0103",
      ac: "\u223E",
      acE: "\u223E\u0333",
      acd: "\u223F",
      acirc: "\xE2",
      acute: "\xB4",
      acy: "\u0430",
      aelig: "\xE6",
      af: "\u2061",
      afr: "\u{1D51E}",
      agrave: "\xE0",
      alefsym: "\u2135",
      aleph: "\u2135",
      alpha: "\u03B1",
      amacr: "\u0101",
      amalg: "\u2A3F",
      amp: "&",
      and: "\u2227",
      andand: "\u2A55",
      andd: "\u2A5C",
      andslope: "\u2A58",
      andv: "\u2A5A",
      ang: "\u2220",
      ange: "\u29A4",
      angle: "\u2220",
      angmsd: "\u2221",
      angmsdaa: "\u29A8",
      angmsdab: "\u29A9",
      angmsdac: "\u29AA",
      angmsdad: "\u29AB",
      angmsdae: "\u29AC",
      angmsdaf: "\u29AD",
      angmsdag: "\u29AE",
      angmsdah: "\u29AF",
      angrt: "\u221F",
      angrtvb: "\u22BE",
      angrtvbd: "\u299D",
      angsph: "\u2222",
      angst: "\xC5",
      angzarr: "\u237C",
      aogon: "\u0105",
      aopf: "\u{1D552}",
      ap: "\u2248",
      apE: "\u2A70",
      apacir: "\u2A6F",
      ape: "\u224A",
      apid: "\u224B",
      apos: "'",
      approx: "\u2248",
      approxeq: "\u224A",
      aring: "\xE5",
      ascr: "\u{1D4B6}",
      ast: "*",
      asymp: "\u2248",
      asympeq: "\u224D",
      atilde: "\xE3",
      auml: "\xE4",
      awconint: "\u2233",
      awint: "\u2A11",
      bNot: "\u2AED",
      backcong: "\u224C",
      backepsilon: "\u03F6",
      backprime: "\u2035",
      backsim: "\u223D",
      backsimeq: "\u22CD",
      barvee: "\u22BD",
      barwed: "\u2305",
      barwedge: "\u2305",
      bbrk: "\u23B5",
      bbrktbrk: "\u23B6",
      bcong: "\u224C",
      bcy: "\u0431",
      bdquo: "\u201E",
      becaus: "\u2235",
      because: "\u2235",
      bemptyv: "\u29B0",
      bepsi: "\u03F6",
      bernou: "\u212C",
      beta: "\u03B2",
      beth: "\u2136",
      between: "\u226C",
      bfr: "\u{1D51F}",
      bigcap: "\u22C2",
      bigcirc: "\u25EF",
      bigcup: "\u22C3",
      bigodot: "\u2A00",
      bigoplus: "\u2A01",
      bigotimes: "\u2A02",
      bigsqcup: "\u2A06",
      bigstar: "\u2605",
      bigtriangledown: "\u25BD",
      bigtriangleup: "\u25B3",
      biguplus: "\u2A04",
      bigvee: "\u22C1",
      bigwedge: "\u22C0",
      bkarow: "\u290D",
      blacklozenge: "\u29EB",
      blacksquare: "\u25AA",
      blacktriangle: "\u25B4",
      blacktriangledown: "\u25BE",
      blacktriangleleft: "\u25C2",
      blacktriangleright: "\u25B8",
      blank: "\u2423",
      blk12: "\u2592",
      blk14: "\u2591",
      blk34: "\u2593",
      block: "\u2588",
      bne: "=\u20E5",
      bnequiv: "\u2261\u20E5",
      bnot: "\u2310",
      bopf: "\u{1D553}",
      bot: "\u22A5",
      bottom: "\u22A5",
      bowtie: "\u22C8",
      boxDL: "\u2557",
      boxDR: "\u2554",
      boxDl: "\u2556",
      boxDr: "\u2553",
      boxH: "\u2550",
      boxHD: "\u2566",
      boxHU: "\u2569",
      boxHd: "\u2564",
      boxHu: "\u2567",
      boxUL: "\u255D",
      boxUR: "\u255A",
      boxUl: "\u255C",
      boxUr: "\u2559",
      boxV: "\u2551",
      boxVH: "\u256C",
      boxVL: "\u2563",
      boxVR: "\u2560",
      boxVh: "\u256B",
      boxVl: "\u2562",
      boxVr: "\u255F",
      boxbox: "\u29C9",
      boxdL: "\u2555",
      boxdR: "\u2552",
      boxdl: "\u2510",
      boxdr: "\u250C",
      boxh: "\u2500",
      boxhD: "\u2565",
      boxhU: "\u2568",
      boxhd: "\u252C",
      boxhu: "\u2534",
      boxminus: "\u229F",
      boxplus: "\u229E",
      boxtimes: "\u22A0",
      boxuL: "\u255B",
      boxuR: "\u2558",
      boxul: "\u2518",
      boxur: "\u2514",
      boxv: "\u2502",
      boxvH: "\u256A",
      boxvL: "\u2561",
      boxvR: "\u255E",
      boxvh: "\u253C",
      boxvl: "\u2524",
      boxvr: "\u251C",
      bprime: "\u2035",
      breve: "\u02D8",
      brvbar: "\xA6",
      bscr: "\u{1D4B7}",
      bsemi: "\u204F",
      bsim: "\u223D",
      bsime: "\u22CD",
      bsol: "\\",
      bsolb: "\u29C5",
      bsolhsub: "\u27C8",
      bull: "\u2022",
      bullet: "\u2022",
      bump: "\u224E",
      bumpE: "\u2AAE",
      bumpe: "\u224F",
      bumpeq: "\u224F",
      cacute: "\u0107",
      cap: "\u2229",
      capand: "\u2A44",
      capbrcup: "\u2A49",
      capcap: "\u2A4B",
      capcup: "\u2A47",
      capdot: "\u2A40",
      caps: "\u2229\uFE00",
      caret: "\u2041",
      caron: "\u02C7",
      ccaps: "\u2A4D",
      ccaron: "\u010D",
      ccedil: "\xE7",
      ccirc: "\u0109",
      ccups: "\u2A4C",
      ccupssm: "\u2A50",
      cdot: "\u010B",
      cedil: "\xB8",
      cemptyv: "\u29B2",
      cent: "\xA2",
      centerdot: "\xB7",
      cfr: "\u{1D520}",
      chcy: "\u0447",
      check: "\u2713",
      checkmark: "\u2713",
      chi: "\u03C7",
      cir: "\u25CB",
      cirE: "\u29C3",
      circ: "\u02C6",
      circeq: "\u2257",
      circlearrowleft: "\u21BA",
      circlearrowright: "\u21BB",
      circledR: "\xAE",
      circledS: "\u24C8",
      circledast: "\u229B",
      circledcirc: "\u229A",
      circleddash: "\u229D",
      cire: "\u2257",
      cirfnint: "\u2A10",
      cirmid: "\u2AEF",
      cirscir: "\u29C2",
      clubs: "\u2663",
      clubsuit: "\u2663",
      colon: ":",
      colone: "\u2254",
      coloneq: "\u2254",
      comma: ",",
      commat: "@",
      comp: "\u2201",
      compfn: "\u2218",
      complement: "\u2201",
      complexes: "\u2102",
      cong: "\u2245",
      congdot: "\u2A6D",
      conint: "\u222E",
      copf: "\u{1D554}",
      coprod: "\u2210",
      copy: "\xA9",
      copysr: "\u2117",
      crarr: "\u21B5",
      cross: "\u2717",
      cscr: "\u{1D4B8}",
      csub: "\u2ACF",
      csube: "\u2AD1",
      csup: "\u2AD0",
      csupe: "\u2AD2",
      ctdot: "\u22EF",
      cudarrl: "\u2938",
      cudarrr: "\u2935",
      cuepr: "\u22DE",
      cuesc: "\u22DF",
      cularr: "\u21B6",
      cularrp: "\u293D",
      cup: "\u222A",
      cupbrcap: "\u2A48",
      cupcap: "\u2A46",
      cupcup: "\u2A4A",
      cupdot: "\u228D",
      cupor: "\u2A45",
      cups: "\u222A\uFE00",
      curarr: "\u21B7",
      curarrm: "\u293C",
      curlyeqprec: "\u22DE",
      curlyeqsucc: "\u22DF",
      curlyvee: "\u22CE",
      curlywedge: "\u22CF",
      curren: "\xA4",
      curvearrowleft: "\u21B6",
      curvearrowright: "\u21B7",
      cuvee: "\u22CE",
      cuwed: "\u22CF",
      cwconint: "\u2232",
      cwint: "\u2231",
      cylcty: "\u232D",
      dArr: "\u21D3",
      dHar: "\u2965",
      dagger: "\u2020",
      daleth: "\u2138",
      darr: "\u2193",
      dash: "\u2010",
      dashv: "\u22A3",
      dbkarow: "\u290F",
      dblac: "\u02DD",
      dcaron: "\u010F",
      dcy: "\u0434",
      dd: "\u2146",
      ddagger: "\u2021",
      ddarr: "\u21CA",
      ddotseq: "\u2A77",
      deg: "\xB0",
      delta: "\u03B4",
      demptyv: "\u29B1",
      dfisht: "\u297F",
      dfr: "\u{1D521}",
      dharl: "\u21C3",
      dharr: "\u21C2",
      diam: "\u22C4",
      diamond: "\u22C4",
      diamondsuit: "\u2666",
      diams: "\u2666",
      die: "\xA8",
      digamma: "\u03DD",
      disin: "\u22F2",
      div: "\xF7",
      divide: "\xF7",
      divideontimes: "\u22C7",
      divonx: "\u22C7",
      djcy: "\u0452",
      dlcorn: "\u231E",
      dlcrop: "\u230D",
      dollar: "$",
      dopf: "\u{1D555}",
      dot: "\u02D9",
      doteq: "\u2250",
      doteqdot: "\u2251",
      dotminus: "\u2238",
      dotplus: "\u2214",
      dotsquare: "\u22A1",
      doublebarwedge: "\u2306",
      downarrow: "\u2193",
      downdownarrows: "\u21CA",
      downharpoonleft: "\u21C3",
      downharpoonright: "\u21C2",
      drbkarow: "\u2910",
      drcorn: "\u231F",
      drcrop: "\u230C",
      dscr: "\u{1D4B9}",
      dscy: "\u0455",
      dsol: "\u29F6",
      dstrok: "\u0111",
      dtdot: "\u22F1",
      dtri: "\u25BF",
      dtrif: "\u25BE",
      duarr: "\u21F5",
      duhar: "\u296F",
      dwangle: "\u29A6",
      dzcy: "\u045F",
      dzigrarr: "\u27FF",
      eDDot: "\u2A77",
      eDot: "\u2251",
      eacute: "\xE9",
      easter: "\u2A6E",
      ecaron: "\u011B",
      ecir: "\u2256",
      ecirc: "\xEA",
      ecolon: "\u2255",
      ecy: "\u044D",
      edot: "\u0117",
      ee: "\u2147",
      efDot: "\u2252",
      efr: "\u{1D522}",
      eg: "\u2A9A",
      egrave: "\xE8",
      egs: "\u2A96",
      egsdot: "\u2A98",
      el: "\u2A99",
      elinters: "\u23E7",
      ell: "\u2113",
      els: "\u2A95",
      elsdot: "\u2A97",
      emacr: "\u0113",
      empty: "\u2205",
      emptyset: "\u2205",
      emptyv: "\u2205",
      emsp13: "\u2004",
      emsp14: "\u2005",
      emsp: "\u2003",
      eng: "\u014B",
      ensp: "\u2002",
      eogon: "\u0119",
      eopf: "\u{1D556}",
      epar: "\u22D5",
      eparsl: "\u29E3",
      eplus: "\u2A71",
      epsi: "\u03B5",
      epsilon: "\u03B5",
      epsiv: "\u03F5",
      eqcirc: "\u2256",
      eqcolon: "\u2255",
      eqsim: "\u2242",
      eqslantgtr: "\u2A96",
      eqslantless: "\u2A95",
      equals: "=",
      equest: "\u225F",
      equiv: "\u2261",
      equivDD: "\u2A78",
      eqvparsl: "\u29E5",
      erDot: "\u2253",
      erarr: "\u2971",
      escr: "\u212F",
      esdot: "\u2250",
      esim: "\u2242",
      eta: "\u03B7",
      eth: "\xF0",
      euml: "\xEB",
      euro: "\u20AC",
      excl: "!",
      exist: "\u2203",
      expectation: "\u2130",
      exponentiale: "\u2147",
      fallingdotseq: "\u2252",
      fcy: "\u0444",
      female: "\u2640",
      ffilig: "\uFB03",
      fflig: "\uFB00",
      ffllig: "\uFB04",
      ffr: "\u{1D523}",
      filig: "\uFB01",
      fjlig: "fj",
      flat: "\u266D",
      fllig: "\uFB02",
      fltns: "\u25B1",
      fnof: "\u0192",
      fopf: "\u{1D557}",
      forall: "\u2200",
      fork: "\u22D4",
      forkv: "\u2AD9",
      fpartint: "\u2A0D",
      frac12: "\xBD",
      frac13: "\u2153",
      frac14: "\xBC",
      frac15: "\u2155",
      frac16: "\u2159",
      frac18: "\u215B",
      frac23: "\u2154",
      frac25: "\u2156",
      frac34: "\xBE",
      frac35: "\u2157",
      frac38: "\u215C",
      frac45: "\u2158",
      frac56: "\u215A",
      frac58: "\u215D",
      frac78: "\u215E",
      frasl: "\u2044",
      frown: "\u2322",
      fscr: "\u{1D4BB}",
      gE: "\u2267",
      gEl: "\u2A8C",
      gacute: "\u01F5",
      gamma: "\u03B3",
      gammad: "\u03DD",
      gap: "\u2A86",
      gbreve: "\u011F",
      gcirc: "\u011D",
      gcy: "\u0433",
      gdot: "\u0121",
      ge: "\u2265",
      gel: "\u22DB",
      geq: "\u2265",
      geqq: "\u2267",
      geqslant: "\u2A7E",
      ges: "\u2A7E",
      gescc: "\u2AA9",
      gesdot: "\u2A80",
      gesdoto: "\u2A82",
      gesdotol: "\u2A84",
      gesl: "\u22DB\uFE00",
      gesles: "\u2A94",
      gfr: "\u{1D524}",
      gg: "\u226B",
      ggg: "\u22D9",
      gimel: "\u2137",
      gjcy: "\u0453",
      gl: "\u2277",
      glE: "\u2A92",
      gla: "\u2AA5",
      glj: "\u2AA4",
      gnE: "\u2269",
      gnap: "\u2A8A",
      gnapprox: "\u2A8A",
      gne: "\u2A88",
      gneq: "\u2A88",
      gneqq: "\u2269",
      gnsim: "\u22E7",
      gopf: "\u{1D558}",
      grave: "`",
      gscr: "\u210A",
      gsim: "\u2273",
      gsime: "\u2A8E",
      gsiml: "\u2A90",
      gt: ">",
      gtcc: "\u2AA7",
      gtcir: "\u2A7A",
      gtdot: "\u22D7",
      gtlPar: "\u2995",
      gtquest: "\u2A7C",
      gtrapprox: "\u2A86",
      gtrarr: "\u2978",
      gtrdot: "\u22D7",
      gtreqless: "\u22DB",
      gtreqqless: "\u2A8C",
      gtrless: "\u2277",
      gtrsim: "\u2273",
      gvertneqq: "\u2269\uFE00",
      gvnE: "\u2269\uFE00",
      hArr: "\u21D4",
      hairsp: "\u200A",
      half: "\xBD",
      hamilt: "\u210B",
      hardcy: "\u044A",
      harr: "\u2194",
      harrcir: "\u2948",
      harrw: "\u21AD",
      hbar: "\u210F",
      hcirc: "\u0125",
      hearts: "\u2665",
      heartsuit: "\u2665",
      hellip: "\u2026",
      hercon: "\u22B9",
      hfr: "\u{1D525}",
      hksearow: "\u2925",
      hkswarow: "\u2926",
      hoarr: "\u21FF",
      homtht: "\u223B",
      hookleftarrow: "\u21A9",
      hookrightarrow: "\u21AA",
      hopf: "\u{1D559}",
      horbar: "\u2015",
      hscr: "\u{1D4BD}",
      hslash: "\u210F",
      hstrok: "\u0127",
      hybull: "\u2043",
      hyphen: "\u2010",
      iacute: "\xED",
      ic: "\u2063",
      icirc: "\xEE",
      icy: "\u0438",
      iecy: "\u0435",
      iexcl: "\xA1",
      iff: "\u21D4",
      ifr: "\u{1D526}",
      igrave: "\xEC",
      ii: "\u2148",
      iiiint: "\u2A0C",
      iiint: "\u222D",
      iinfin: "\u29DC",
      iiota: "\u2129",
      ijlig: "\u0133",
      imacr: "\u012B",
      image: "\u2111",
      imagline: "\u2110",
      imagpart: "\u2111",
      imath: "\u0131",
      imof: "\u22B7",
      imped: "\u01B5",
      in: "\u2208",
      incare: "\u2105",
      infin: "\u221E",
      infintie: "\u29DD",
      inodot: "\u0131",
      int: "\u222B",
      intcal: "\u22BA",
      integers: "\u2124",
      intercal: "\u22BA",
      intlarhk: "\u2A17",
      intprod: "\u2A3C",
      iocy: "\u0451",
      iogon: "\u012F",
      iopf: "\u{1D55A}",
      iota: "\u03B9",
      iprod: "\u2A3C",
      iquest: "\xBF",
      iscr: "\u{1D4BE}",
      isin: "\u2208",
      isinE: "\u22F9",
      isindot: "\u22F5",
      isins: "\u22F4",
      isinsv: "\u22F3",
      isinv: "\u2208",
      it: "\u2062",
      itilde: "\u0129",
      iukcy: "\u0456",
      iuml: "\xEF",
      jcirc: "\u0135",
      jcy: "\u0439",
      jfr: "\u{1D527}",
      jmath: "\u0237",
      jopf: "\u{1D55B}",
      jscr: "\u{1D4BF}",
      jsercy: "\u0458",
      jukcy: "\u0454",
      kappa: "\u03BA",
      kappav: "\u03F0",
      kcedil: "\u0137",
      kcy: "\u043A",
      kfr: "\u{1D528}",
      kgreen: "\u0138",
      khcy: "\u0445",
      kjcy: "\u045C",
      kopf: "\u{1D55C}",
      kscr: "\u{1D4C0}",
      lAarr: "\u21DA",
      lArr: "\u21D0",
      lAtail: "\u291B",
      lBarr: "\u290E",
      lE: "\u2266",
      lEg: "\u2A8B",
      lHar: "\u2962",
      lacute: "\u013A",
      laemptyv: "\u29B4",
      lagran: "\u2112",
      lambda: "\u03BB",
      lang: "\u27E8",
      langd: "\u2991",
      langle: "\u27E8",
      lap: "\u2A85",
      laquo: "\xAB",
      larr: "\u2190",
      larrb: "\u21E4",
      larrbfs: "\u291F",
      larrfs: "\u291D",
      larrhk: "\u21A9",
      larrlp: "\u21AB",
      larrpl: "\u2939",
      larrsim: "\u2973",
      larrtl: "\u21A2",
      lat: "\u2AAB",
      latail: "\u2919",
      late: "\u2AAD",
      lates: "\u2AAD\uFE00",
      lbarr: "\u290C",
      lbbrk: "\u2772",
      lbrace: "{",
      lbrack: "[",
      lbrke: "\u298B",
      lbrksld: "\u298F",
      lbrkslu: "\u298D",
      lcaron: "\u013E",
      lcedil: "\u013C",
      lceil: "\u2308",
      lcub: "{",
      lcy: "\u043B",
      ldca: "\u2936",
      ldquo: "\u201C",
      ldquor: "\u201E",
      ldrdhar: "\u2967",
      ldrushar: "\u294B",
      ldsh: "\u21B2",
      le: "\u2264",
      leftarrow: "\u2190",
      leftarrowtail: "\u21A2",
      leftharpoondown: "\u21BD",
      leftharpoonup: "\u21BC",
      leftleftarrows: "\u21C7",
      leftrightarrow: "\u2194",
      leftrightarrows: "\u21C6",
      leftrightharpoons: "\u21CB",
      leftrightsquigarrow: "\u21AD",
      leftthreetimes: "\u22CB",
      leg: "\u22DA",
      leq: "\u2264",
      leqq: "\u2266",
      leqslant: "\u2A7D",
      les: "\u2A7D",
      lescc: "\u2AA8",
      lesdot: "\u2A7F",
      lesdoto: "\u2A81",
      lesdotor: "\u2A83",
      lesg: "\u22DA\uFE00",
      lesges: "\u2A93",
      lessapprox: "\u2A85",
      lessdot: "\u22D6",
      lesseqgtr: "\u22DA",
      lesseqqgtr: "\u2A8B",
      lessgtr: "\u2276",
      lesssim: "\u2272",
      lfisht: "\u297C",
      lfloor: "\u230A",
      lfr: "\u{1D529}",
      lg: "\u2276",
      lgE: "\u2A91",
      lhard: "\u21BD",
      lharu: "\u21BC",
      lharul: "\u296A",
      lhblk: "\u2584",
      ljcy: "\u0459",
      ll: "\u226A",
      llarr: "\u21C7",
      llcorner: "\u231E",
      llhard: "\u296B",
      lltri: "\u25FA",
      lmidot: "\u0140",
      lmoust: "\u23B0",
      lmoustache: "\u23B0",
      lnE: "\u2268",
      lnap: "\u2A89",
      lnapprox: "\u2A89",
      lne: "\u2A87",
      lneq: "\u2A87",
      lneqq: "\u2268",
      lnsim: "\u22E6",
      loang: "\u27EC",
      loarr: "\u21FD",
      lobrk: "\u27E6",
      longleftarrow: "\u27F5",
      longleftrightarrow: "\u27F7",
      longmapsto: "\u27FC",
      longrightarrow: "\u27F6",
      looparrowleft: "\u21AB",
      looparrowright: "\u21AC",
      lopar: "\u2985",
      lopf: "\u{1D55D}",
      loplus: "\u2A2D",
      lotimes: "\u2A34",
      lowast: "\u2217",
      lowbar: "_",
      loz: "\u25CA",
      lozenge: "\u25CA",
      lozf: "\u29EB",
      lpar: "(",
      lparlt: "\u2993",
      lrarr: "\u21C6",
      lrcorner: "\u231F",
      lrhar: "\u21CB",
      lrhard: "\u296D",
      lrm: "\u200E",
      lrtri: "\u22BF",
      lsaquo: "\u2039",
      lscr: "\u{1D4C1}",
      lsh: "\u21B0",
      lsim: "\u2272",
      lsime: "\u2A8D",
      lsimg: "\u2A8F",
      lsqb: "[",
      lsquo: "\u2018",
      lsquor: "\u201A",
      lstrok: "\u0142",
      lt: "<",
      ltcc: "\u2AA6",
      ltcir: "\u2A79",
      ltdot: "\u22D6",
      lthree: "\u22CB",
      ltimes: "\u22C9",
      ltlarr: "\u2976",
      ltquest: "\u2A7B",
      ltrPar: "\u2996",
      ltri: "\u25C3",
      ltrie: "\u22B4",
      ltrif: "\u25C2",
      lurdshar: "\u294A",
      luruhar: "\u2966",
      lvertneqq: "\u2268\uFE00",
      lvnE: "\u2268\uFE00",
      mDDot: "\u223A",
      macr: "\xAF",
      male: "\u2642",
      malt: "\u2720",
      maltese: "\u2720",
      map: "\u21A6",
      mapsto: "\u21A6",
      mapstodown: "\u21A7",
      mapstoleft: "\u21A4",
      mapstoup: "\u21A5",
      marker: "\u25AE",
      mcomma: "\u2A29",
      mcy: "\u043C",
      mdash: "\u2014",
      measuredangle: "\u2221",
      mfr: "\u{1D52A}",
      mho: "\u2127",
      micro: "\xB5",
      mid: "\u2223",
      midast: "*",
      midcir: "\u2AF0",
      middot: "\xB7",
      minus: "\u2212",
      minusb: "\u229F",
      minusd: "\u2238",
      minusdu: "\u2A2A",
      mlcp: "\u2ADB",
      mldr: "\u2026",
      mnplus: "\u2213",
      models: "\u22A7",
      mopf: "\u{1D55E}",
      mp: "\u2213",
      mscr: "\u{1D4C2}",
      mstpos: "\u223E",
      mu: "\u03BC",
      multimap: "\u22B8",
      mumap: "\u22B8",
      nGg: "\u22D9\u0338",
      nGt: "\u226B\u20D2",
      nGtv: "\u226B\u0338",
      nLeftarrow: "\u21CD",
      nLeftrightarrow: "\u21CE",
      nLl: "\u22D8\u0338",
      nLt: "\u226A\u20D2",
      nLtv: "\u226A\u0338",
      nRightarrow: "\u21CF",
      nVDash: "\u22AF",
      nVdash: "\u22AE",
      nabla: "\u2207",
      nacute: "\u0144",
      nang: "\u2220\u20D2",
      nap: "\u2249",
      napE: "\u2A70\u0338",
      napid: "\u224B\u0338",
      napos: "\u0149",
      napprox: "\u2249",
      natur: "\u266E",
      natural: "\u266E",
      naturals: "\u2115",
      nbsp: "\xA0",
      nbump: "\u224E\u0338",
      nbumpe: "\u224F\u0338",
      ncap: "\u2A43",
      ncaron: "\u0148",
      ncedil: "\u0146",
      ncong: "\u2247",
      ncongdot: "\u2A6D\u0338",
      ncup: "\u2A42",
      ncy: "\u043D",
      ndash: "\u2013",
      ne: "\u2260",
      neArr: "\u21D7",
      nearhk: "\u2924",
      nearr: "\u2197",
      nearrow: "\u2197",
      nedot: "\u2250\u0338",
      nequiv: "\u2262",
      nesear: "\u2928",
      nesim: "\u2242\u0338",
      nexist: "\u2204",
      nexists: "\u2204",
      nfr: "\u{1D52B}",
      ngE: "\u2267\u0338",
      nge: "\u2271",
      ngeq: "\u2271",
      ngeqq: "\u2267\u0338",
      ngeqslant: "\u2A7E\u0338",
      nges: "\u2A7E\u0338",
      ngsim: "\u2275",
      ngt: "\u226F",
      ngtr: "\u226F",
      nhArr: "\u21CE",
      nharr: "\u21AE",
      nhpar: "\u2AF2",
      ni: "\u220B",
      nis: "\u22FC",
      nisd: "\u22FA",
      niv: "\u220B",
      njcy: "\u045A",
      nlArr: "\u21CD",
      nlE: "\u2266\u0338",
      nlarr: "\u219A",
      nldr: "\u2025",
      nle: "\u2270",
      nleftarrow: "\u219A",
      nleftrightarrow: "\u21AE",
      nleq: "\u2270",
      nleqq: "\u2266\u0338",
      nleqslant: "\u2A7D\u0338",
      nles: "\u2A7D\u0338",
      nless: "\u226E",
      nlsim: "\u2274",
      nlt: "\u226E",
      nltri: "\u22EA",
      nltrie: "\u22EC",
      nmid: "\u2224",
      nopf: "\u{1D55F}",
      not: "\xAC",
      notin: "\u2209",
      notinE: "\u22F9\u0338",
      notindot: "\u22F5\u0338",
      notinva: "\u2209",
      notinvb: "\u22F7",
      notinvc: "\u22F6",
      notni: "\u220C",
      notniva: "\u220C",
      notnivb: "\u22FE",
      notnivc: "\u22FD",
      npar: "\u2226",
      nparallel: "\u2226",
      nparsl: "\u2AFD\u20E5",
      npart: "\u2202\u0338",
      npolint: "\u2A14",
      npr: "\u2280",
      nprcue: "\u22E0",
      npre: "\u2AAF\u0338",
      nprec: "\u2280",
      npreceq: "\u2AAF\u0338",
      nrArr: "\u21CF",
      nrarr: "\u219B",
      nrarrc: "\u2933\u0338",
      nrarrw: "\u219D\u0338",
      nrightarrow: "\u219B",
      nrtri: "\u22EB",
      nrtrie: "\u22ED",
      nsc: "\u2281",
      nsccue: "\u22E1",
      nsce: "\u2AB0\u0338",
      nscr: "\u{1D4C3}",
      nshortmid: "\u2224",
      nshortparallel: "\u2226",
      nsim: "\u2241",
      nsime: "\u2244",
      nsimeq: "\u2244",
      nsmid: "\u2224",
      nspar: "\u2226",
      nsqsube: "\u22E2",
      nsqsupe: "\u22E3",
      nsub: "\u2284",
      nsubE: "\u2AC5\u0338",
      nsube: "\u2288",
      nsubset: "\u2282\u20D2",
      nsubseteq: "\u2288",
      nsubseteqq: "\u2AC5\u0338",
      nsucc: "\u2281",
      nsucceq: "\u2AB0\u0338",
      nsup: "\u2285",
      nsupE: "\u2AC6\u0338",
      nsupe: "\u2289",
      nsupset: "\u2283\u20D2",
      nsupseteq: "\u2289",
      nsupseteqq: "\u2AC6\u0338",
      ntgl: "\u2279",
      ntilde: "\xF1",
      ntlg: "\u2278",
      ntriangleleft: "\u22EA",
      ntrianglelefteq: "\u22EC",
      ntriangleright: "\u22EB",
      ntrianglerighteq: "\u22ED",
      nu: "\u03BD",
      num: "#",
      numero: "\u2116",
      numsp: "\u2007",
      nvDash: "\u22AD",
      nvHarr: "\u2904",
      nvap: "\u224D\u20D2",
      nvdash: "\u22AC",
      nvge: "\u2265\u20D2",
      nvgt: ">\u20D2",
      nvinfin: "\u29DE",
      nvlArr: "\u2902",
      nvle: "\u2264\u20D2",
      nvlt: "<\u20D2",
      nvltrie: "\u22B4\u20D2",
      nvrArr: "\u2903",
      nvrtrie: "\u22B5\u20D2",
      nvsim: "\u223C\u20D2",
      nwArr: "\u21D6",
      nwarhk: "\u2923",
      nwarr: "\u2196",
      nwarrow: "\u2196",
      nwnear: "\u2927",
      oS: "\u24C8",
      oacute: "\xF3",
      oast: "\u229B",
      ocir: "\u229A",
      ocirc: "\xF4",
      ocy: "\u043E",
      odash: "\u229D",
      odblac: "\u0151",
      odiv: "\u2A38",
      odot: "\u2299",
      odsold: "\u29BC",
      oelig: "\u0153",
      ofcir: "\u29BF",
      ofr: "\u{1D52C}",
      ogon: "\u02DB",
      ograve: "\xF2",
      ogt: "\u29C1",
      ohbar: "\u29B5",
      ohm: "\u03A9",
      oint: "\u222E",
      olarr: "\u21BA",
      olcir: "\u29BE",
      olcross: "\u29BB",
      oline: "\u203E",
      olt: "\u29C0",
      omacr: "\u014D",
      omega: "\u03C9",
      omicron: "\u03BF",
      omid: "\u29B6",
      ominus: "\u2296",
      oopf: "\u{1D560}",
      opar: "\u29B7",
      operp: "\u29B9",
      oplus: "\u2295",
      or: "\u2228",
      orarr: "\u21BB",
      ord: "\u2A5D",
      order: "\u2134",
      orderof: "\u2134",
      ordf: "\xAA",
      ordm: "\xBA",
      origof: "\u22B6",
      oror: "\u2A56",
      orslope: "\u2A57",
      orv: "\u2A5B",
      oscr: "\u2134",
      oslash: "\xF8",
      osol: "\u2298",
      otilde: "\xF5",
      otimes: "\u2297",
      otimesas: "\u2A36",
      ouml: "\xF6",
      ovbar: "\u233D",
      par: "\u2225",
      para: "\xB6",
      parallel: "\u2225",
      parsim: "\u2AF3",
      parsl: "\u2AFD",
      part: "\u2202",
      pcy: "\u043F",
      percnt: "%",
      period: ".",
      permil: "\u2030",
      perp: "\u22A5",
      pertenk: "\u2031",
      pfr: "\u{1D52D}",
      phi: "\u03C6",
      phiv: "\u03D5",
      phmmat: "\u2133",
      phone: "\u260E",
      pi: "\u03C0",
      pitchfork: "\u22D4",
      piv: "\u03D6",
      planck: "\u210F",
      planckh: "\u210E",
      plankv: "\u210F",
      plus: "+",
      plusacir: "\u2A23",
      plusb: "\u229E",
      pluscir: "\u2A22",
      plusdo: "\u2214",
      plusdu: "\u2A25",
      pluse: "\u2A72",
      plusmn: "\xB1",
      plussim: "\u2A26",
      plustwo: "\u2A27",
      pm: "\xB1",
      pointint: "\u2A15",
      popf: "\u{1D561}",
      pound: "\xA3",
      pr: "\u227A",
      prE: "\u2AB3",
      prap: "\u2AB7",
      prcue: "\u227C",
      pre: "\u2AAF",
      prec: "\u227A",
      precapprox: "\u2AB7",
      preccurlyeq: "\u227C",
      preceq: "\u2AAF",
      precnapprox: "\u2AB9",
      precneqq: "\u2AB5",
      precnsim: "\u22E8",
      precsim: "\u227E",
      prime: "\u2032",
      primes: "\u2119",
      prnE: "\u2AB5",
      prnap: "\u2AB9",
      prnsim: "\u22E8",
      prod: "\u220F",
      profalar: "\u232E",
      profline: "\u2312",
      profsurf: "\u2313",
      prop: "\u221D",
      propto: "\u221D",
      prsim: "\u227E",
      prurel: "\u22B0",
      pscr: "\u{1D4C5}",
      psi: "\u03C8",
      puncsp: "\u2008",
      qfr: "\u{1D52E}",
      qint: "\u2A0C",
      qopf: "\u{1D562}",
      qprime: "\u2057",
      qscr: "\u{1D4C6}",
      quaternions: "\u210D",
      quatint: "\u2A16",
      quest: "?",
      questeq: "\u225F",
      quot: '"',
      rAarr: "\u21DB",
      rArr: "\u21D2",
      rAtail: "\u291C",
      rBarr: "\u290F",
      rHar: "\u2964",
      race: "\u223D\u0331",
      racute: "\u0155",
      radic: "\u221A",
      raemptyv: "\u29B3",
      rang: "\u27E9",
      rangd: "\u2992",
      range: "\u29A5",
      rangle: "\u27E9",
      raquo: "\xBB",
      rarr: "\u2192",
      rarrap: "\u2975",
      rarrb: "\u21E5",
      rarrbfs: "\u2920",
      rarrc: "\u2933",
      rarrfs: "\u291E",
      rarrhk: "\u21AA",
      rarrlp: "\u21AC",
      rarrpl: "\u2945",
      rarrsim: "\u2974",
      rarrtl: "\u21A3",
      rarrw: "\u219D",
      ratail: "\u291A",
      ratio: "\u2236",
      rationals: "\u211A",
      rbarr: "\u290D",
      rbbrk: "\u2773",
      rbrace: "}",
      rbrack: "]",
      rbrke: "\u298C",
      rbrksld: "\u298E",
      rbrkslu: "\u2990",
      rcaron: "\u0159",
      rcedil: "\u0157",
      rceil: "\u2309",
      rcub: "}",
      rcy: "\u0440",
      rdca: "\u2937",
      rdldhar: "\u2969",
      rdquo: "\u201D",
      rdquor: "\u201D",
      rdsh: "\u21B3",
      real: "\u211C",
      realine: "\u211B",
      realpart: "\u211C",
      reals: "\u211D",
      rect: "\u25AD",
      reg: "\xAE",
      rfisht: "\u297D",
      rfloor: "\u230B",
      rfr: "\u{1D52F}",
      rhard: "\u21C1",
      rharu: "\u21C0",
      rharul: "\u296C",
      rho: "\u03C1",
      rhov: "\u03F1",
      rightarrow: "\u2192",
      rightarrowtail: "\u21A3",
      rightharpoondown: "\u21C1",
      rightharpoonup: "\u21C0",
      rightleftarrows: "\u21C4",
      rightleftharpoons: "\u21CC",
      rightrightarrows: "\u21C9",
      rightsquigarrow: "\u219D",
      rightthreetimes: "\u22CC",
      ring: "\u02DA",
      risingdotseq: "\u2253",
      rlarr: "\u21C4",
      rlhar: "\u21CC",
      rlm: "\u200F",
      rmoust: "\u23B1",
      rmoustache: "\u23B1",
      rnmid: "\u2AEE",
      roang: "\u27ED",
      roarr: "\u21FE",
      robrk: "\u27E7",
      ropar: "\u2986",
      ropf: "\u{1D563}",
      roplus: "\u2A2E",
      rotimes: "\u2A35",
      rpar: ")",
      rpargt: "\u2994",
      rppolint: "\u2A12",
      rrarr: "\u21C9",
      rsaquo: "\u203A",
      rscr: "\u{1D4C7}",
      rsh: "\u21B1",
      rsqb: "]",
      rsquo: "\u2019",
      rsquor: "\u2019",
      rthree: "\u22CC",
      rtimes: "\u22CA",
      rtri: "\u25B9",
      rtrie: "\u22B5",
      rtrif: "\u25B8",
      rtriltri: "\u29CE",
      ruluhar: "\u2968",
      rx: "\u211E",
      sacute: "\u015B",
      sbquo: "\u201A",
      sc: "\u227B",
      scE: "\u2AB4",
      scap: "\u2AB8",
      scaron: "\u0161",
      sccue: "\u227D",
      sce: "\u2AB0",
      scedil: "\u015F",
      scirc: "\u015D",
      scnE: "\u2AB6",
      scnap: "\u2ABA",
      scnsim: "\u22E9",
      scpolint: "\u2A13",
      scsim: "\u227F",
      scy: "\u0441",
      sdot: "\u22C5",
      sdotb: "\u22A1",
      sdote: "\u2A66",
      seArr: "\u21D8",
      searhk: "\u2925",
      searr: "\u2198",
      searrow: "\u2198",
      sect: "\xA7",
      semi: ";",
      seswar: "\u2929",
      setminus: "\u2216",
      setmn: "\u2216",
      sext: "\u2736",
      sfr: "\u{1D530}",
      sfrown: "\u2322",
      sharp: "\u266F",
      shchcy: "\u0449",
      shcy: "\u0448",
      shortmid: "\u2223",
      shortparallel: "\u2225",
      shy: "\xAD",
      sigma: "\u03C3",
      sigmaf: "\u03C2",
      sigmav: "\u03C2",
      sim: "\u223C",
      simdot: "\u2A6A",
      sime: "\u2243",
      simeq: "\u2243",
      simg: "\u2A9E",
      simgE: "\u2AA0",
      siml: "\u2A9D",
      simlE: "\u2A9F",
      simne: "\u2246",
      simplus: "\u2A24",
      simrarr: "\u2972",
      slarr: "\u2190",
      smallsetminus: "\u2216",
      smashp: "\u2A33",
      smeparsl: "\u29E4",
      smid: "\u2223",
      smile: "\u2323",
      smt: "\u2AAA",
      smte: "\u2AAC",
      smtes: "\u2AAC\uFE00",
      softcy: "\u044C",
      sol: "/",
      solb: "\u29C4",
      solbar: "\u233F",
      sopf: "\u{1D564}",
      spades: "\u2660",
      spadesuit: "\u2660",
      spar: "\u2225",
      sqcap: "\u2293",
      sqcaps: "\u2293\uFE00",
      sqcup: "\u2294",
      sqcups: "\u2294\uFE00",
      sqsub: "\u228F",
      sqsube: "\u2291",
      sqsubset: "\u228F",
      sqsubseteq: "\u2291",
      sqsup: "\u2290",
      sqsupe: "\u2292",
      sqsupset: "\u2290",
      sqsupseteq: "\u2292",
      squ: "\u25A1",
      square: "\u25A1",
      squarf: "\u25AA",
      squf: "\u25AA",
      srarr: "\u2192",
      sscr: "\u{1D4C8}",
      ssetmn: "\u2216",
      ssmile: "\u2323",
      sstarf: "\u22C6",
      star: "\u2606",
      starf: "\u2605",
      straightepsilon: "\u03F5",
      straightphi: "\u03D5",
      strns: "\xAF",
      sub: "\u2282",
      subE: "\u2AC5",
      subdot: "\u2ABD",
      sube: "\u2286",
      subedot: "\u2AC3",
      submult: "\u2AC1",
      subnE: "\u2ACB",
      subne: "\u228A",
      subplus: "\u2ABF",
      subrarr: "\u2979",
      subset: "\u2282",
      subseteq: "\u2286",
      subseteqq: "\u2AC5",
      subsetneq: "\u228A",
      subsetneqq: "\u2ACB",
      subsim: "\u2AC7",
      subsub: "\u2AD5",
      subsup: "\u2AD3",
      succ: "\u227B",
      succapprox: "\u2AB8",
      succcurlyeq: "\u227D",
      succeq: "\u2AB0",
      succnapprox: "\u2ABA",
      succneqq: "\u2AB6",
      succnsim: "\u22E9",
      succsim: "\u227F",
      sum: "\u2211",
      sung: "\u266A",
      sup1: "\xB9",
      sup2: "\xB2",
      sup3: "\xB3",
      sup: "\u2283",
      supE: "\u2AC6",
      supdot: "\u2ABE",
      supdsub: "\u2AD8",
      supe: "\u2287",
      supedot: "\u2AC4",
      suphsol: "\u27C9",
      suphsub: "\u2AD7",
      suplarr: "\u297B",
      supmult: "\u2AC2",
      supnE: "\u2ACC",
      supne: "\u228B",
      supplus: "\u2AC0",
      supset: "\u2283",
      supseteq: "\u2287",
      supseteqq: "\u2AC6",
      supsetneq: "\u228B",
      supsetneqq: "\u2ACC",
      supsim: "\u2AC8",
      supsub: "\u2AD4",
      supsup: "\u2AD6",
      swArr: "\u21D9",
      swarhk: "\u2926",
      swarr: "\u2199",
      swarrow: "\u2199",
      swnwar: "\u292A",
      szlig: "\xDF",
      target: "\u2316",
      tau: "\u03C4",
      tbrk: "\u23B4",
      tcaron: "\u0165",
      tcedil: "\u0163",
      tcy: "\u0442",
      tdot: "\u20DB",
      telrec: "\u2315",
      tfr: "\u{1D531}",
      there4: "\u2234",
      therefore: "\u2234",
      theta: "\u03B8",
      thetasym: "\u03D1",
      thetav: "\u03D1",
      thickapprox: "\u2248",
      thicksim: "\u223C",
      thinsp: "\u2009",
      thkap: "\u2248",
      thksim: "\u223C",
      thorn: "\xFE",
      tilde: "\u02DC",
      times: "\xD7",
      timesb: "\u22A0",
      timesbar: "\u2A31",
      timesd: "\u2A30",
      tint: "\u222D",
      toea: "\u2928",
      top: "\u22A4",
      topbot: "\u2336",
      topcir: "\u2AF1",
      topf: "\u{1D565}",
      topfork: "\u2ADA",
      tosa: "\u2929",
      tprime: "\u2034",
      trade: "\u2122",
      triangle: "\u25B5",
      triangledown: "\u25BF",
      triangleleft: "\u25C3",
      trianglelefteq: "\u22B4",
      triangleq: "\u225C",
      triangleright: "\u25B9",
      trianglerighteq: "\u22B5",
      tridot: "\u25EC",
      trie: "\u225C",
      triminus: "\u2A3A",
      triplus: "\u2A39",
      trisb: "\u29CD",
      tritime: "\u2A3B",
      trpezium: "\u23E2",
      tscr: "\u{1D4C9}",
      tscy: "\u0446",
      tshcy: "\u045B",
      tstrok: "\u0167",
      twixt: "\u226C",
      twoheadleftarrow: "\u219E",
      twoheadrightarrow: "\u21A0",
      uArr: "\u21D1",
      uHar: "\u2963",
      uacute: "\xFA",
      uarr: "\u2191",
      ubrcy: "\u045E",
      ubreve: "\u016D",
      ucirc: "\xFB",
      ucy: "\u0443",
      udarr: "\u21C5",
      udblac: "\u0171",
      udhar: "\u296E",
      ufisht: "\u297E",
      ufr: "\u{1D532}",
      ugrave: "\xF9",
      uharl: "\u21BF",
      uharr: "\u21BE",
      uhblk: "\u2580",
      ulcorn: "\u231C",
      ulcorner: "\u231C",
      ulcrop: "\u230F",
      ultri: "\u25F8",
      umacr: "\u016B",
      uml: "\xA8",
      uogon: "\u0173",
      uopf: "\u{1D566}",
      uparrow: "\u2191",
      updownarrow: "\u2195",
      upharpoonleft: "\u21BF",
      upharpoonright: "\u21BE",
      uplus: "\u228E",
      upsi: "\u03C5",
      upsih: "\u03D2",
      upsilon: "\u03C5",
      upuparrows: "\u21C8",
      urcorn: "\u231D",
      urcorner: "\u231D",
      urcrop: "\u230E",
      uring: "\u016F",
      urtri: "\u25F9",
      uscr: "\u{1D4CA}",
      utdot: "\u22F0",
      utilde: "\u0169",
      utri: "\u25B5",
      utrif: "\u25B4",
      uuarr: "\u21C8",
      uuml: "\xFC",
      uwangle: "\u29A7",
      vArr: "\u21D5",
      vBar: "\u2AE8",
      vBarv: "\u2AE9",
      vDash: "\u22A8",
      vangrt: "\u299C",
      varepsilon: "\u03F5",
      varkappa: "\u03F0",
      varnothing: "\u2205",
      varphi: "\u03D5",
      varpi: "\u03D6",
      varpropto: "\u221D",
      varr: "\u2195",
      varrho: "\u03F1",
      varsigma: "\u03C2",
      varsubsetneq: "\u228A\uFE00",
      varsubsetneqq: "\u2ACB\uFE00",
      varsupsetneq: "\u228B\uFE00",
      varsupsetneqq: "\u2ACC\uFE00",
      vartheta: "\u03D1",
      vartriangleleft: "\u22B2",
      vartriangleright: "\u22B3",
      vcy: "\u0432",
      vdash: "\u22A2",
      vee: "\u2228",
      veebar: "\u22BB",
      veeeq: "\u225A",
      vellip: "\u22EE",
      verbar: "|",
      vert: "|",
      vfr: "\u{1D533}",
      vltri: "\u22B2",
      vnsub: "\u2282\u20D2",
      vnsup: "\u2283\u20D2",
      vopf: "\u{1D567}",
      vprop: "\u221D",
      vrtri: "\u22B3",
      vscr: "\u{1D4CB}",
      vsubnE: "\u2ACB\uFE00",
      vsubne: "\u228A\uFE00",
      vsupnE: "\u2ACC\uFE00",
      vsupne: "\u228B\uFE00",
      vzigzag: "\u299A",
      wcirc: "\u0175",
      wedbar: "\u2A5F",
      wedge: "\u2227",
      wedgeq: "\u2259",
      weierp: "\u2118",
      wfr: "\u{1D534}",
      wopf: "\u{1D568}",
      wp: "\u2118",
      wr: "\u2240",
      wreath: "\u2240",
      wscr: "\u{1D4CC}",
      xcap: "\u22C2",
      xcirc: "\u25EF",
      xcup: "\u22C3",
      xdtri: "\u25BD",
      xfr: "\u{1D535}",
      xhArr: "\u27FA",
      xharr: "\u27F7",
      xi: "\u03BE",
      xlArr: "\u27F8",
      xlarr: "\u27F5",
      xmap: "\u27FC",
      xnis: "\u22FB",
      xodot: "\u2A00",
      xopf: "\u{1D569}",
      xoplus: "\u2A01",
      xotime: "\u2A02",
      xrArr: "\u27F9",
      xrarr: "\u27F6",
      xscr: "\u{1D4CD}",
      xsqcup: "\u2A06",
      xuplus: "\u2A04",
      xutri: "\u25B3",
      xvee: "\u22C1",
      xwedge: "\u22C0",
      yacute: "\xFD",
      yacy: "\u044F",
      ycirc: "\u0177",
      ycy: "\u044B",
      yen: "\xA5",
      yfr: "\u{1D536}",
      yicy: "\u0457",
      yopf: "\u{1D56A}",
      yscr: "\u{1D4CE}",
      yucy: "\u044E",
      yuml: "\xFF",
      zacute: "\u017A",
      zcaron: "\u017E",
      zcy: "\u0437",
      zdot: "\u017C",
      zeetrf: "\u2128",
      zeta: "\u03B6",
      zfr: "\u{1D537}",
      zhcy: "\u0436",
      zigrarr: "\u21DD",
      zopf: "\u{1D56B}",
      zscr: "\u{1D4CF}",
      zwj: "\u200D",
      zwnj: "\u200C"
    };
  }
});

// node_modules/decode-named-character-reference/index.js
function decodeNamedCharacterReference(value2) {
  return own5.call(characterEntities, value2) ? characterEntities[value2] : false;
}
var own5;
var init_decode_named_character_reference = __esm({
  "node_modules/decode-named-character-reference/index.js"() {
    init_character_entities();
    own5 = {}.hasOwnProperty;
  }
});

// node_modules/format/format.js
var require_format = __commonJS({
  "node_modules/format/format.js"(exports, module2) {
    (function() {
      var namespace;
      if (typeof module2 !== "undefined") {
        namespace = module2.exports = format;
      } else {
        namespace = function() {
          return this || (1, eval)("this");
        }();
      }
      namespace.format = format;
      namespace.vsprintf = vsprintf;
      if (typeof console !== "undefined" && typeof console.log === "function") {
        namespace.printf = printf;
      }
      function printf() {
        console.log(format.apply(null, arguments));
      }
      function vsprintf(fmt, replacements) {
        return format.apply(null, [fmt].concat(replacements));
      }
      function format(fmt) {
        var argIndex = 1, args = [].slice.call(arguments), i2 = 0, n = fmt.length, result = "", c2, escaped = false, arg, tmp, leadingZero = false, precision, nextArg = function() {
          return args[argIndex++];
        }, slurpNumber = function() {
          var digits = "";
          while (/\d/.test(fmt[i2])) {
            digits += fmt[i2++];
            c2 = fmt[i2];
          }
          return digits.length > 0 ? parseInt(digits) : null;
        };
        for (; i2 < n; ++i2) {
          c2 = fmt[i2];
          if (escaped) {
            escaped = false;
            if (c2 == ".") {
              leadingZero = false;
              c2 = fmt[++i2];
            } else if (c2 == "0" && fmt[i2 + 1] == ".") {
              leadingZero = true;
              i2 += 2;
              c2 = fmt[i2];
            } else {
              leadingZero = true;
            }
            precision = slurpNumber();
            switch (c2) {
              case "b":
                result += parseInt(nextArg(), 10).toString(2);
                break;
              case "c":
                arg = nextArg();
                if (typeof arg === "string" || arg instanceof String)
                  result += arg;
                else
                  result += String.fromCharCode(parseInt(arg, 10));
                break;
              case "d":
                result += parseInt(nextArg(), 10);
                break;
              case "f":
                tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
                result += leadingZero ? tmp : tmp.replace(/^0/, "");
                break;
              case "j":
                result += JSON.stringify(nextArg());
                break;
              case "o":
                result += "0" + parseInt(nextArg(), 10).toString(8);
                break;
              case "s":
                result += nextArg();
                break;
              case "x":
                result += "0x" + parseInt(nextArg(), 10).toString(16);
                break;
              case "X":
                result += "0x" + parseInt(nextArg(), 10).toString(16).toUpperCase();
                break;
              default:
                result += c2;
                break;
            }
          } else if (c2 === "%") {
            escaped = true;
          } else {
            result += c2;
          }
        }
        return result;
      }
    })();
  }
});

// node_modules/fault/index.js
function create2(Constructor) {
  FormattedError.displayName = Constructor.displayName || Constructor.name;
  return FormattedError;
  function FormattedError(format, ...values) {
    const reason = format ? (0, import_format2.default)(format, ...values) : format;
    return new Constructor(reason);
  }
}
var import_format2, fault;
var init_fault = __esm({
  "node_modules/fault/index.js"() {
    import_format2 = __toESM(require_format(), 1);
    fault = Object.assign(create2(Error), {
      eval: create2(EvalError),
      range: create2(RangeError),
      reference: create2(ReferenceError),
      syntax: create2(SyntaxError),
      type: create2(TypeError),
      uri: create2(URIError)
    });
  }
});

// node_modules/micromark-extension-frontmatter/matters.js
function matters(options2 = "yaml") {
  const results = [];
  let index = -1;
  if (!Array.isArray(options2)) {
    options2 = [options2];
  }
  while (++index < options2.length) {
    results[index] = matter(options2[index]);
  }
  return results;
}
function matter(option) {
  let result = option;
  if (typeof result === "string") {
    if (!own7.call(markers, result)) {
      throw fault("Missing matter definition for `%s`", result);
    }
    result = {
      type: result,
      marker: markers[result]
    };
  } else if (typeof result !== "object") {
    throw fault("Expected matter to be an object, not `%j`", result);
  }
  if (!own7.call(result, "type")) {
    throw fault("Missing `type` in matter `%j`", result);
  }
  if (!own7.call(result, "fence") && !own7.call(result, "marker")) {
    throw fault("Missing `marker` or `fence` in matter `%j`", result);
  }
  return result;
}
var own7, markers;
var init_matters = __esm({
  "node_modules/micromark-extension-frontmatter/matters.js"() {
    init_fault();
    own7 = {}.hasOwnProperty;
    markers = {
      yaml: "-",
      toml: "+"
    };
  }
});

// node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
var unicodePunctuationRegex;
var init_unicode_punctuation_regex = __esm({
  "node_modules/micromark-util-character/lib/unicode-punctuation-regex.js"() {
    unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
  }
});

// node_modules/micromark-util-character/index.js
function asciiControl(code2) {
  return code2 !== null && (code2 < 32 || code2 === 127);
}
function markdownLineEndingOrSpace(code2) {
  return code2 !== null && (code2 < 0 || code2 === 32);
}
function markdownLineEnding(code2) {
  return code2 !== null && code2 < -2;
}
function markdownSpace(code2) {
  return code2 === -2 || code2 === -1 || code2 === 32;
}
function regexCheck(regex3) {
  return check;
  function check(code2) {
    return code2 !== null && regex3.test(String.fromCharCode(code2));
  }
}
var asciiAlpha, asciiDigit, asciiHexDigit, asciiAlphanumeric, asciiPunctuation, asciiAtext, unicodeWhitespace, unicodePunctuation;
var init_micromark_util_character = __esm({
  "node_modules/micromark-util-character/index.js"() {
    init_unicode_punctuation_regex();
    asciiAlpha = regexCheck(/[A-Za-z]/);
    asciiDigit = regexCheck(/\d/);
    asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
    asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
    asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
    asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
    unicodeWhitespace = regexCheck(/\s/);
    unicodePunctuation = regexCheck(unicodePunctuationRegex);
  }
});

// node_modules/micromark-extension-frontmatter/lib/syntax.js
function frontmatter(options2) {
  const settings = matters(options2);
  const flow = {};
  let index = -1;
  let matter2;
  let code2;
  while (++index < settings.length) {
    matter2 = settings[index];
    code2 = fence(matter2, "open").charCodeAt(0);
    if (code2 in flow) {
      flow[code2].push(parse3(matter2));
    } else {
      flow[code2] = [parse3(matter2)];
    }
  }
  return {
    flow
  };
}
function parse3(matter2) {
  const name = matter2.type;
  const anywhere = matter2.anywhere;
  const valueType = name + "Value";
  const fenceType = name + "Fence";
  const sequenceType = fenceType + "Sequence";
  const fenceConstruct = {
    tokenize: tokenizeFence,
    partial: true
  };
  let buffer;
  return {
    tokenize: tokenizeFrontmatter,
    concrete: true
  };
  function tokenizeFrontmatter(effects, ok2, nok) {
    const self2 = this;
    return start;
    function start(code2) {
      const position = self2.now();
      if (position.column !== 1 || !anywhere && position.line !== 1) {
        return nok(code2);
      }
      effects.enter(name);
      buffer = fence(matter2, "open");
      return effects.attempt(fenceConstruct, afterOpeningFence, nok)(code2);
    }
    function afterOpeningFence(code2) {
      buffer = fence(matter2, "close");
      return lineEnd(code2);
    }
    function lineStart(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return lineEnd(code2);
      }
      effects.enter(valueType);
      return lineData(code2);
    }
    function lineData(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit(valueType);
        return lineEnd(code2);
      }
      effects.consume(code2);
      return lineData;
    }
    function lineEnd(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return effects.attempt(fenceConstruct, after, lineStart);
    }
    function after(code2) {
      effects.exit(name);
      return ok2(code2);
    }
  }
  function tokenizeFence(effects, ok2, nok) {
    let bufferIndex = 0;
    return start;
    function start(code2) {
      if (code2 === buffer.charCodeAt(bufferIndex)) {
        effects.enter(fenceType);
        effects.enter(sequenceType);
        return insideSequence(code2);
      }
      return nok(code2);
    }
    function insideSequence(code2) {
      if (bufferIndex === buffer.length) {
        effects.exit(sequenceType);
        if (markdownSpace(code2)) {
          effects.enter("whitespace");
          return insideWhitespace(code2);
        }
        return fenceEnd(code2);
      }
      if (code2 === buffer.charCodeAt(bufferIndex++)) {
        effects.consume(code2);
        return insideSequence;
      }
      return nok(code2);
    }
    function insideWhitespace(code2) {
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return insideWhitespace;
      }
      effects.exit("whitespace");
      return fenceEnd(code2);
    }
    function fenceEnd(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit(fenceType);
        return ok2(code2);
      }
      return nok(code2);
    }
  }
}
function fence(matter2, prop) {
  return matter2.marker ? pick(matter2.marker, prop).repeat(3) : pick(matter2.fence, prop);
}
function pick(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop];
}
var init_syntax = __esm({
  "node_modules/micromark-extension-frontmatter/lib/syntax.js"() {
    init_micromark_util_character();
    init_matters();
  }
});

// node_modules/micromark-extension-frontmatter/index.js
var init_micromark_extension_frontmatter = __esm({
  "node_modules/micromark-extension-frontmatter/index.js"() {
    init_syntax();
  }
});

// node_modules/mdast-util-frontmatter/index.js
function frontmatterFromMarkdown(options2) {
  const settings = matters(options2);
  const enter = {};
  const exit2 = {};
  let index = -1;
  while (++index < settings.length) {
    const matter2 = settings[index];
    enter[matter2.type] = opener(matter2);
    exit2[matter2.type] = close;
    exit2[matter2.type + "Value"] = value;
  }
  return { enter, exit: exit2 };
}
function opener(matter2) {
  return open;
  function open(token) {
    this.enter({ type: matter2.type, value: "" }, token);
    this.buffer();
  }
}
function close(token) {
  const data = this.resume();
  this.exit(token).value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
}
function value(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}
function frontmatterToMarkdown(options2) {
  const unsafe = [];
  const handlers = {};
  const settings = matters(options2);
  let index = -1;
  while (++index < settings.length) {
    const matter2 = settings[index];
    handlers[matter2.type] = handler(matter2);
    unsafe.push({ atBreak: true, character: fence2(matter2, "open").charAt(0) });
  }
  return { unsafe, handlers };
}
function handler(matter2) {
  const open = fence2(matter2, "open");
  const close2 = fence2(matter2, "close");
  return handle;
  function handle(node) {
    return open + (node.value ? "\n" + node.value : "") + "\n" + close2;
  }
}
function fence2(matter2, prop) {
  return matter2.marker ? pick2(matter2.marker, prop).repeat(3) : pick2(matter2.fence, prop);
}
function pick2(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop];
}
var init_mdast_util_frontmatter = __esm({
  "node_modules/mdast-util-frontmatter/index.js"() {
    init_matters();
  }
});

// node_modules/remark-frontmatter/index.js
var remark_frontmatter_exports = {};
__export(remark_frontmatter_exports, {
  default: () => remarkFrontmatter
});
function remarkFrontmatter(options2 = "yaml") {
  const data = this.data();
  add("micromarkExtensions", frontmatter(options2));
  add("fromMarkdownExtensions", frontmatterFromMarkdown(options2));
  add("toMarkdownExtensions", frontmatterToMarkdown(options2));
  function add(field, value2) {
    const list = data[field] ? data[field] : data[field] = [];
    list.push(value2);
  }
}
var init_remark_frontmatter = __esm({
  "node_modules/remark-frontmatter/index.js"() {
    init_micromark_extension_frontmatter();
    init_mdast_util_frontmatter();
  }
});

// node_modules/micromark-util-chunked/index.js
function splice(list, start, remove, items) {
  const end = list.length;
  let chunkStart = 0;
  let parameters;
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    [].splice.apply(list, parameters);
  } else {
    if (remove)
      [].splice.apply(list, [start, remove]);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start, 0);
      [].splice.apply(list, parameters);
      chunkStart += 1e4;
      start += 1e4;
    }
  }
}
var init_micromark_util_chunked = __esm({
  "node_modules/micromark-util-chunked/index.js"() {
  }
});

// node_modules/micromark-util-combine-extensions/index.js
function combineExtensions(extensions) {
  const all2 = {};
  let index = -1;
  while (++index < extensions.length) {
    syntaxExtension(all2, extensions[index]);
  }
  return all2;
}
function syntaxExtension(all2, extension) {
  let hook;
  for (hook in extension) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
    const left = maybe || (all2[hook] = {});
    const right = extension[hook];
    let code2;
    for (code2 in right) {
      if (!hasOwnProperty.call(left, code2))
        left[code2] = [];
      const value2 = right[code2];
      constructs(
        left[code2],
        Array.isArray(value2) ? value2 : value2 ? [value2] : []
      );
    }
  }
}
function constructs(existing, list) {
  let index = -1;
  const before = [];
  while (++index < list.length) {
    ;
    (list[index].add === "after" ? existing : before).push(list[index]);
  }
  splice(existing, 0, 0, before);
}
var hasOwnProperty;
var init_micromark_util_combine_extensions = __esm({
  "node_modules/micromark-util-combine-extensions/index.js"() {
    init_micromark_util_chunked();
    hasOwnProperty = {}.hasOwnProperty;
  }
});

// node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
function tokenizeEmailAutolink(effects, ok2, nok) {
  const self2 = this;
  let hasDot;
  let hasDigitInLastSegment;
  return start;
  function start(code2) {
    if (!gfmAtext(code2) || !previousEmail(self2.previous) || previousUnbalanced(self2.events)) {
      return nok(code2);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkEmail");
    return atext(code2);
  }
  function atext(code2) {
    if (gfmAtext(code2)) {
      effects.consume(code2);
      return atext;
    }
    if (code2 === 64) {
      effects.consume(code2);
      return label;
    }
    return nok(code2);
  }
  function label(code2) {
    if (code2 === 46) {
      return effects.check(punctuation, done, dotContinuation)(code2);
    }
    if (code2 === 45 || code2 === 95) {
      return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code2);
    }
    if (asciiAlphanumeric(code2)) {
      if (!hasDigitInLastSegment && asciiDigit(code2)) {
        hasDigitInLastSegment = true;
      }
      effects.consume(code2);
      return label;
    }
    return done(code2);
  }
  function dotContinuation(code2) {
    effects.consume(code2);
    hasDot = true;
    hasDigitInLastSegment = void 0;
    return label;
  }
  function dashOrUnderscoreContinuation(code2) {
    effects.consume(code2);
    return afterDashOrUnderscore;
  }
  function afterDashOrUnderscore(code2) {
    if (code2 === 46) {
      return effects.check(punctuation, nok, dotContinuation)(code2);
    }
    return label(code2);
  }
  function done(code2) {
    if (hasDot && !hasDigitInLastSegment) {
      effects.exit("literalAutolinkEmail");
      effects.exit("literalAutolink");
      return ok2(code2);
    }
    return nok(code2);
  }
}
function tokenizeWwwAutolink(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    if (code2 !== 87 && code2 !== 119 || !previousWww(self2.previous) || previousUnbalanced(self2.events)) {
      return nok(code2);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkWww");
    return effects.check(
      www,
      effects.attempt(domain, effects.attempt(path, done), nok),
      nok
    )(code2);
  }
  function done(code2) {
    effects.exit("literalAutolinkWww");
    effects.exit("literalAutolink");
    return ok2(code2);
  }
}
function tokenizeHttpAutolink(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    if (code2 !== 72 && code2 !== 104 || !previousHttp(self2.previous) || previousUnbalanced(self2.events)) {
      return nok(code2);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkHttp");
    effects.consume(code2);
    return t1;
  }
  function t1(code2) {
    if (code2 === 84 || code2 === 116) {
      effects.consume(code2);
      return t2;
    }
    return nok(code2);
  }
  function t2(code2) {
    if (code2 === 84 || code2 === 116) {
      effects.consume(code2);
      return p;
    }
    return nok(code2);
  }
  function p(code2) {
    if (code2 === 80 || code2 === 112) {
      effects.consume(code2);
      return s3;
    }
    return nok(code2);
  }
  function s3(code2) {
    if (code2 === 83 || code2 === 115) {
      effects.consume(code2);
      return colon;
    }
    return colon(code2);
  }
  function colon(code2) {
    if (code2 === 58) {
      effects.consume(code2);
      return slash1;
    }
    return nok(code2);
  }
  function slash1(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return slash2;
    }
    return nok(code2);
  }
  function slash2(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === null || asciiControl(code2) || unicodeWhitespace(code2) || unicodePunctuation(code2) ? nok(code2) : effects.attempt(domain, effects.attempt(path, done), nok)(code2);
  }
  function done(code2) {
    effects.exit("literalAutolinkHttp");
    effects.exit("literalAutolink");
    return ok2(code2);
  }
}
function tokenizeWww(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.consume(code2);
    return w2;
  }
  function w2(code2) {
    if (code2 === 87 || code2 === 119) {
      effects.consume(code2);
      return w3;
    }
    return nok(code2);
  }
  function w3(code2) {
    if (code2 === 87 || code2 === 119) {
      effects.consume(code2);
      return dot;
    }
    return nok(code2);
  }
  function dot(code2) {
    if (code2 === 46) {
      effects.consume(code2);
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === null || markdownLineEnding(code2) ? nok(code2) : ok2(code2);
  }
}
function tokenizeDomain(effects, ok2, nok) {
  let hasUnderscoreInLastSegment;
  let hasUnderscoreInLastLastSegment;
  return domain3;
  function domain3(code2) {
    if (code2 === 38) {
      return effects.check(
        namedCharacterReference,
        done,
        punctuationContinuation
      )(code2);
    }
    if (code2 === 46 || code2 === 95) {
      return effects.check(punctuation, done, punctuationContinuation)(code2);
    }
    if (code2 === null || asciiControl(code2) || unicodeWhitespace(code2) || code2 !== 45 && unicodePunctuation(code2)) {
      return done(code2);
    }
    effects.consume(code2);
    return domain3;
  }
  function punctuationContinuation(code2) {
    if (code2 === 46) {
      hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
      hasUnderscoreInLastSegment = void 0;
      effects.consume(code2);
      return domain3;
    }
    if (code2 === 95)
      hasUnderscoreInLastSegment = true;
    effects.consume(code2);
    return domain3;
  }
  function done(code2) {
    if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) {
      return ok2(code2);
    }
    return nok(code2);
  }
}
function tokenizePath(effects, ok2) {
  let balance = 0;
  return inPath;
  function inPath(code2) {
    if (code2 === 38) {
      return effects.check(
        namedCharacterReference,
        ok2,
        continuedPunctuation
      )(code2);
    }
    if (code2 === 40) {
      balance++;
    }
    if (code2 === 41) {
      return effects.check(
        punctuation,
        parenAtPathEnd,
        continuedPunctuation
      )(code2);
    }
    if (pathEnd(code2)) {
      return ok2(code2);
    }
    if (trailingPunctuation(code2)) {
      return effects.check(punctuation, ok2, continuedPunctuation)(code2);
    }
    effects.consume(code2);
    return inPath;
  }
  function continuedPunctuation(code2) {
    effects.consume(code2);
    return inPath;
  }
  function parenAtPathEnd(code2) {
    balance--;
    return balance < 0 ? ok2(code2) : continuedPunctuation(code2);
  }
}
function tokenizeNamedCharacterReference(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.consume(code2);
    return inside;
  }
  function inside(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return inside;
    }
    if (code2 === 59) {
      effects.consume(code2);
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    return pathEnd(code2) ? ok2(code2) : nok(code2);
  }
}
function tokenizePunctuation(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.consume(code2);
    return after;
  }
  function after(code2) {
    if (trailingPunctuation(code2)) {
      effects.consume(code2);
      return after;
    }
    return pathEnd(code2) ? ok2(code2) : nok(code2);
  }
}
function trailingPunctuation(code2) {
  return code2 === 33 || code2 === 34 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 60 || code2 === 63 || code2 === 95 || code2 === 126;
}
function pathEnd(code2) {
  return code2 === null || code2 === 60 || markdownLineEndingOrSpace(code2);
}
function gfmAtext(code2) {
  return code2 === 43 || code2 === 45 || code2 === 46 || code2 === 95 || asciiAlphanumeric(code2);
}
function previousWww(code2) {
  return code2 === null || code2 === 40 || code2 === 42 || code2 === 95 || code2 === 126 || markdownLineEndingOrSpace(code2);
}
function previousHttp(code2) {
  return code2 === null || !asciiAlpha(code2);
}
function previousEmail(code2) {
  return code2 !== 47 && previousHttp(code2);
}
function previousUnbalanced(events) {
  let index = events.length;
  let result = false;
  while (index--) {
    const token = events[index][1];
    if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
      result = true;
      break;
    }
    if (token._gfmAutolinkLiteralWalkedInto) {
      result = false;
      break;
    }
  }
  if (events.length > 0 && !result) {
    events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return result;
}
var www, domain, path, punctuation, namedCharacterReference, wwwAutolink, httpAutolink, emailAutolink, text, gfmAutolinkLiteral, code;
var init_syntax2 = __esm({
  "node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js"() {
    init_micromark_util_character();
    www = {
      tokenize: tokenizeWww,
      partial: true
    };
    domain = {
      tokenize: tokenizeDomain,
      partial: true
    };
    path = {
      tokenize: tokenizePath,
      partial: true
    };
    punctuation = {
      tokenize: tokenizePunctuation,
      partial: true
    };
    namedCharacterReference = {
      tokenize: tokenizeNamedCharacterReference,
      partial: true
    };
    wwwAutolink = {
      tokenize: tokenizeWwwAutolink,
      previous: previousWww
    };
    httpAutolink = {
      tokenize: tokenizeHttpAutolink,
      previous: previousHttp
    };
    emailAutolink = {
      tokenize: tokenizeEmailAutolink,
      previous: previousEmail
    };
    text = {};
    gfmAutolinkLiteral = {
      text
    };
    code = 48;
    while (code < 123) {
      text[code] = emailAutolink;
      code++;
      if (code === 58)
        code = 65;
      else if (code === 91)
        code = 97;
    }
    text[43] = emailAutolink;
    text[45] = emailAutolink;
    text[46] = emailAutolink;
    text[95] = emailAutolink;
    text[72] = [emailAutolink, httpAutolink];
    text[104] = [emailAutolink, httpAutolink];
    text[87] = [emailAutolink, wwwAutolink];
    text[119] = [emailAutolink, wwwAutolink];
  }
});

// node_modules/micromark-extension-gfm-autolink-literal/index.js
var init_micromark_extension_gfm_autolink_literal = __esm({
  "node_modules/micromark-extension-gfm-autolink-literal/index.js"() {
    init_syntax2();
  }
});

// node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code2) {
  if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
    return 1;
  }
  if (unicodePunctuation(code2)) {
    return 2;
  }
}
var init_micromark_util_classify_character = __esm({
  "node_modules/micromark-util-classify-character/index.js"() {
    init_micromark_util_character();
  }
});

// node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  const called = [];
  let index = -1;
  while (++index < constructs2.length) {
    const resolve4 = constructs2[index].resolveAll;
    if (resolve4 && !called.includes(resolve4)) {
      events = resolve4(events, context);
      called.push(resolve4);
    }
  }
  return events;
}
var init_micromark_util_resolve_all = __esm({
  "node_modules/micromark-util-resolve-all/index.js"() {
  }
});

// node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok2, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;
  function start(code2) {
    if (markdownSpace(code2)) {
      effects.enter(type);
      return prefix(code2);
    }
    return ok2(code2);
  }
  function prefix(code2) {
    if (markdownSpace(code2) && size++ < limit) {
      effects.consume(code2);
      return prefix;
    }
    effects.exit(type);
    return ok2(code2);
  }
}
var init_micromark_factory_space = __esm({
  "node_modules/micromark-factory-space/index.js"() {
    init_micromark_util_character();
  }
});

// node_modules/micromark-core-commonmark/lib/blank-line.js
function tokenizeBlankLine(effects, ok2, nok) {
  return factorySpace(effects, afterWhitespace, "linePrefix");
  function afterWhitespace(code2) {
    return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
  }
}
var blankLine;
var init_blank_line = __esm({
  "node_modules/micromark-core-commonmark/lib/blank-line.js"() {
    init_micromark_factory_space();
    init_micromark_util_character();
    blankLine = {
      tokenize: tokenizeBlankLine,
      partial: true
    };
  }
});

// node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value2) {
  return value2.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
var init_micromark_util_normalize_identifier = __esm({
  "node_modules/micromark-util-normalize-identifier/index.js"() {
  }
});

// node_modules/micromark-core-commonmark/index.js
var init_micromark_core_commonmark = __esm({
  "node_modules/micromark-core-commonmark/index.js"() {
    init_blank_line();
  }
});

// node_modules/micromark-extension-gfm-footnote/lib/syntax.js
function gfmFootnote() {
  return {
    document: {
      [91]: {
        tokenize: tokenizeDefinitionStart,
        continuation: {
          tokenize: tokenizeDefinitionContinuation
        },
        exit: gfmFootnoteDefinitionEnd
      }
    },
    text: {
      [91]: {
        tokenize: tokenizeGfmFootnoteCall
      },
      [93]: {
        add: "after",
        tokenize: tokenizePotentialGfmFootnoteCall,
        resolveTo: resolveToPotentialGfmFootnoteCall
      }
    }
  };
}
function tokenizePotentialGfmFootnoteCall(effects, ok2, nok) {
  const self2 = this;
  let index = self2.events.length;
  const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
  let labelStart;
  while (index--) {
    const token = self2.events[index][1];
    if (token.type === "labelImage") {
      labelStart = token;
      break;
    }
    if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
      break;
    }
  }
  return start;
  function start(code2) {
    if (!labelStart || !labelStart._balanced) {
      return nok(code2);
    }
    const id = normalizeIdentifier(
      self2.sliceSerialize({
        start: labelStart.end,
        end: self2.now()
      })
    );
    if (id.charCodeAt(0) !== 94 || !defined.includes(id.slice(1))) {
      return nok(code2);
    }
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code2);
    effects.exit("gfmFootnoteCallLabelMarker");
    return ok2(code2);
  }
}
function resolveToPotentialGfmFootnoteCall(events, context) {
  let index = events.length;
  let labelStart;
  while (index--) {
    if (events[index][1].type === "labelImage" && events[index][0] === "enter") {
      labelStart = events[index][1];
      break;
    }
  }
  events[index + 1][1].type = "data";
  events[index + 3][1].type = "gfmFootnoteCallLabelMarker";
  const call = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, events[index + 3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const marker = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, events[index + 3][1].end),
    end: Object.assign({}, events[index + 3][1].end)
  };
  marker.end.column++;
  marker.end.offset++;
  marker.end._bufferIndex++;
  const string = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, marker.end),
    end: Object.assign({}, events[events.length - 1][1].start)
  };
  const chunk = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, string.start),
    end: Object.assign({}, string.end)
  };
  const replacement = [
    events[index + 1],
    events[index + 2],
    ["enter", call, context],
    events[index + 3],
    events[index + 4],
    ["enter", marker, context],
    ["exit", marker, context],
    ["enter", string, context],
    ["enter", chunk, context],
    ["exit", chunk, context],
    ["exit", string, context],
    events[events.length - 2],
    events[events.length - 1],
    ["exit", call, context]
  ];
  events.splice(index, events.length - index + 1, ...replacement);
  return events;
}
function tokenizeGfmFootnoteCall(effects, ok2, nok) {
  const self2 = this;
  const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
  let size = 0;
  let data;
  return start;
  function start(code2) {
    effects.enter("gfmFootnoteCall");
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code2);
    effects.exit("gfmFootnoteCallLabelMarker");
    return callStart;
  }
  function callStart(code2) {
    if (code2 !== 94)
      return nok(code2);
    effects.enter("gfmFootnoteCallMarker");
    effects.consume(code2);
    effects.exit("gfmFootnoteCallMarker");
    effects.enter("gfmFootnoteCallString");
    effects.enter("chunkString").contentType = "string";
    return callData;
  }
  function callData(code2) {
    let token;
    if (code2 === null || code2 === 91 || size++ > 999) {
      return nok(code2);
    }
    if (code2 === 93) {
      if (!data) {
        return nok(code2);
      }
      effects.exit("chunkString");
      token = effects.exit("gfmFootnoteCallString");
      return defined.includes(normalizeIdentifier(self2.sliceSerialize(token))) ? end(code2) : nok(code2);
    }
    effects.consume(code2);
    if (!markdownLineEndingOrSpace(code2)) {
      data = true;
    }
    return code2 === 92 ? callEscape : callData;
  }
  function callEscape(code2) {
    if (code2 === 91 || code2 === 92 || code2 === 93) {
      effects.consume(code2);
      size++;
      return callData;
    }
    return callData(code2);
  }
  function end(code2) {
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code2);
    effects.exit("gfmFootnoteCallLabelMarker");
    effects.exit("gfmFootnoteCall");
    return ok2;
  }
}
function tokenizeDefinitionStart(effects, ok2, nok) {
  const self2 = this;
  const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
  let identifier;
  let size = 0;
  let data;
  return start;
  function start(code2) {
    effects.enter("gfmFootnoteDefinition")._container = true;
    effects.enter("gfmFootnoteDefinitionLabel");
    effects.enter("gfmFootnoteDefinitionLabelMarker");
    effects.consume(code2);
    effects.exit("gfmFootnoteDefinitionLabelMarker");
    return labelStart;
  }
  function labelStart(code2) {
    if (code2 === 94) {
      effects.enter("gfmFootnoteDefinitionMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteDefinitionMarker");
      effects.enter("gfmFootnoteDefinitionLabelString");
      return atBreak;
    }
    return nok(code2);
  }
  function atBreak(code2) {
    let token;
    if (code2 === null || code2 === 91 || size > 999) {
      return nok(code2);
    }
    if (code2 === 93) {
      if (!data) {
        return nok(code2);
      }
      token = effects.exit("gfmFootnoteDefinitionLabelString");
      identifier = normalizeIdentifier(self2.sliceSerialize(token));
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      effects.exit("gfmFootnoteDefinitionLabel");
      return labelAfter;
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      size++;
      return atBreak;
    }
    effects.enter("chunkString").contentType = "string";
    return label(code2);
  }
  function label(code2) {
    if (code2 === null || markdownLineEnding(code2) || code2 === 91 || code2 === 93 || size > 999) {
      effects.exit("chunkString");
      return atBreak(code2);
    }
    if (!markdownLineEndingOrSpace(code2)) {
      data = true;
    }
    size++;
    effects.consume(code2);
    return code2 === 92 ? labelEscape : label;
  }
  function labelEscape(code2) {
    if (code2 === 91 || code2 === 92 || code2 === 93) {
      effects.consume(code2);
      size++;
      return label;
    }
    return label(code2);
  }
  function labelAfter(code2) {
    if (code2 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code2);
      effects.exit("definitionMarker");
      return factorySpace(effects, done, "gfmFootnoteDefinitionWhitespace");
    }
    return nok(code2);
  }
  function done(code2) {
    if (!defined.includes(identifier)) {
      defined.push(identifier);
    }
    return ok2(code2);
  }
}
function tokenizeDefinitionContinuation(effects, ok2, nok) {
  return effects.check(blankLine, ok2, effects.attempt(indent, ok2, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
  effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent(effects, ok2, nok) {
  const self2 = this;
  return factorySpace(
    effects,
    afterPrefix,
    "gfmFootnoteDefinitionIndent",
    4 + 1
  );
  function afterPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok2(code2) : nok(code2);
  }
}
var indent;
var init_syntax3 = __esm({
  "node_modules/micromark-extension-gfm-footnote/lib/syntax.js"() {
    init_micromark_core_commonmark();
    init_micromark_factory_space();
    init_micromark_util_character();
    init_micromark_util_normalize_identifier();
    indent = {
      tokenize: tokenizeIndent,
      partial: true
    };
  }
});

// node_modules/micromark-extension-gfm-footnote/index.js
var init_micromark_extension_gfm_footnote = __esm({
  "node_modules/micromark-extension-gfm-footnote/index.js"() {
    init_syntax3();
  }
});

// node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function gfmStrikethrough(options2 = {}) {
  let single = options2.singleTilde;
  const tokenizer = {
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  };
  if (single === null || single === void 0) {
    single = true;
  }
  return {
    text: {
      [126]: tokenizer
    },
    insideSpan: {
      null: [tokenizer]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function resolveAllStrikethrough(events, context) {
    let index = -1;
    while (++index < events.length) {
      if (events[index][0] === "enter" && events[index][1].type === "strikethroughSequenceTemporary" && events[index][1]._close) {
        let open = index;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
            events[index][1].type = "strikethroughSequence";
            events[open][1].type = "strikethroughSequence";
            const strikethrough = {
              type: "strikethrough",
              start: Object.assign({}, events[open][1].start),
              end: Object.assign({}, events[index][1].end)
            };
            const text2 = {
              type: "strikethroughText",
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index][1].start)
            };
            const nextEvents = [
              ["enter", strikethrough, context],
              ["enter", events[open][1], context],
              ["exit", events[open][1], context],
              ["enter", text2, context]
            ];
            splice(
              nextEvents,
              nextEvents.length,
              0,
              resolveAll(
                context.parser.constructs.insideSpan.null,
                events.slice(open + 1, index),
                context
              )
            );
            splice(nextEvents, nextEvents.length, 0, [
              ["exit", text2, context],
              ["enter", events[index][1], context],
              ["exit", events[index][1], context],
              ["exit", strikethrough, context]
            ]);
            splice(events, open - 1, index - open + 3, nextEvents);
            index = open + nextEvents.length - 2;
            break;
          }
        }
      }
    }
    index = -1;
    while (++index < events.length) {
      if (events[index][1].type === "strikethroughSequenceTemporary") {
        events[index][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeStrikethrough(effects, ok2, nok) {
    const previous2 = this.previous;
    const events = this.events;
    let size = 0;
    return start;
    function start(code2) {
      if (previous2 === 126 && events[events.length - 1][1].type !== "characterEscape") {
        return nok(code2);
      }
      effects.enter("strikethroughSequenceTemporary");
      return more(code2);
    }
    function more(code2) {
      const before = classifyCharacter(previous2);
      if (code2 === 126) {
        if (size > 1)
          return nok(code2);
        effects.consume(code2);
        size++;
        return more;
      }
      if (size < 2 && !single)
        return nok(code2);
      const token = effects.exit("strikethroughSequenceTemporary");
      const after = classifyCharacter(code2);
      token._open = !after || after === 2 && Boolean(before);
      token._close = !before || before === 2 && Boolean(after);
      return ok2(code2);
    }
  }
}
var init_syntax4 = __esm({
  "node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js"() {
    init_micromark_util_chunked();
    init_micromark_util_classify_character();
    init_micromark_util_resolve_all();
  }
});

// node_modules/micromark-extension-gfm-strikethrough/index.js
var init_micromark_extension_gfm_strikethrough = __esm({
  "node_modules/micromark-extension-gfm-strikethrough/index.js"() {
    init_syntax4();
  }
});

// node_modules/micromark-extension-gfm-table/lib/syntax.js
function resolveTable(events, context) {
  let index = -1;
  let inHead;
  let inDelimiterRow;
  let inRow;
  let contentStart;
  let contentEnd;
  let cellStart;
  let seenCellInRow;
  while (++index < events.length) {
    const token = events[index][1];
    if (inRow) {
      if (token.type === "temporaryTableCellContent") {
        contentStart = contentStart || index;
        contentEnd = index;
      }
      if ((token.type === "tableCellDivider" || token.type === "tableRow") && contentEnd) {
        const content = {
          type: "tableContent",
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end
        };
        const text2 = {
          type: "chunkText",
          start: content.start,
          end: content.end,
          contentType: "text"
        };
        events.splice(
          contentStart,
          contentEnd - contentStart + 1,
          ["enter", content, context],
          ["enter", text2, context],
          ["exit", text2, context],
          ["exit", content, context]
        );
        index -= contentEnd - contentStart - 3;
        contentStart = void 0;
        contentEnd = void 0;
      }
    }
    if (events[index][0] === "exit" && cellStart !== void 0 && cellStart + (seenCellInRow ? 0 : 1) < index && (token.type === "tableCellDivider" || token.type === "tableRow" && (cellStart + 3 < index || events[cellStart][1].type !== "whitespace"))) {
      const cell = {
        type: inDelimiterRow ? "tableDelimiter" : inHead ? "tableHeader" : "tableData",
        start: events[cellStart][1].start,
        end: events[index][1].end
      };
      events.splice(index + (token.type === "tableCellDivider" ? 1 : 0), 0, [
        "exit",
        cell,
        context
      ]);
      events.splice(cellStart, 0, ["enter", cell, context]);
      index += 2;
      cellStart = index + 1;
      seenCellInRow = true;
    }
    if (token.type === "tableRow") {
      inRow = events[index][0] === "enter";
      if (inRow) {
        cellStart = index + 1;
        seenCellInRow = false;
      }
    }
    if (token.type === "tableDelimiterRow") {
      inDelimiterRow = events[index][0] === "enter";
      if (inDelimiterRow) {
        cellStart = index + 1;
        seenCellInRow = false;
      }
    }
    if (token.type === "tableHead") {
      inHead = events[index][0] === "enter";
    }
  }
  return events;
}
function tokenizeTable(effects, ok2, nok) {
  const self2 = this;
  const align = [];
  let tableHeaderCount = 0;
  let seenDelimiter;
  let hasDash;
  return start;
  function start(code2) {
    effects.enter("table")._align = align;
    effects.enter("tableHead");
    effects.enter("tableRow");
    if (code2 === 124) {
      return cellDividerHead(code2);
    }
    tableHeaderCount++;
    effects.enter("temporaryTableCellContent");
    return inCellContentHead(code2);
  }
  function cellDividerHead(code2) {
    effects.enter("tableCellDivider");
    effects.consume(code2);
    effects.exit("tableCellDivider");
    seenDelimiter = true;
    return cellBreakHead;
  }
  function cellBreakHead(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return atRowEndHead(code2);
    }
    if (markdownSpace(code2)) {
      effects.enter("whitespace");
      effects.consume(code2);
      return inWhitespaceHead;
    }
    if (seenDelimiter) {
      seenDelimiter = void 0;
      tableHeaderCount++;
    }
    if (code2 === 124) {
      return cellDividerHead(code2);
    }
    effects.enter("temporaryTableCellContent");
    return inCellContentHead(code2);
  }
  function inWhitespaceHead(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return inWhitespaceHead;
    }
    effects.exit("whitespace");
    return cellBreakHead(code2);
  }
  function inCellContentHead(code2) {
    if (code2 === null || code2 === 124 || markdownLineEndingOrSpace(code2)) {
      effects.exit("temporaryTableCellContent");
      return cellBreakHead(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? inCellContentEscapeHead : inCellContentHead;
  }
  function inCellContentEscapeHead(code2) {
    if (code2 === 92 || code2 === 124) {
      effects.consume(code2);
      return inCellContentHead;
    }
    return inCellContentHead(code2);
  }
  function atRowEndHead(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    effects.exit("tableRow");
    effects.exit("tableHead");
    const originalInterrupt = self2.interrupt;
    self2.interrupt = true;
    return effects.attempt(
      {
        tokenize: tokenizeRowEnd,
        partial: true
      },
      function(code3) {
        self2.interrupt = originalInterrupt;
        effects.enter("tableDelimiterRow");
        return atDelimiterRowBreak(code3);
      },
      function(code3) {
        self2.interrupt = originalInterrupt;
        return nok(code3);
      }
    )(code2);
  }
  function atDelimiterRowBreak(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return rowEndDelimiter(code2);
    }
    if (markdownSpace(code2)) {
      effects.enter("whitespace");
      effects.consume(code2);
      return inWhitespaceDelimiter;
    }
    if (code2 === 45) {
      effects.enter("tableDelimiterFiller");
      effects.consume(code2);
      hasDash = true;
      align.push("none");
      return inFillerDelimiter;
    }
    if (code2 === 58) {
      effects.enter("tableDelimiterAlignment");
      effects.consume(code2);
      effects.exit("tableDelimiterAlignment");
      align.push("left");
      return afterLeftAlignment;
    }
    if (code2 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code2);
      effects.exit("tableCellDivider");
      return atDelimiterRowBreak;
    }
    return nok(code2);
  }
  function inWhitespaceDelimiter(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return inWhitespaceDelimiter;
    }
    effects.exit("whitespace");
    return atDelimiterRowBreak(code2);
  }
  function inFillerDelimiter(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return inFillerDelimiter;
    }
    effects.exit("tableDelimiterFiller");
    if (code2 === 58) {
      effects.enter("tableDelimiterAlignment");
      effects.consume(code2);
      effects.exit("tableDelimiterAlignment");
      align[align.length - 1] = align[align.length - 1] === "left" ? "center" : "right";
      return afterRightAlignment;
    }
    return atDelimiterRowBreak(code2);
  }
  function afterLeftAlignment(code2) {
    if (code2 === 45) {
      effects.enter("tableDelimiterFiller");
      effects.consume(code2);
      hasDash = true;
      return inFillerDelimiter;
    }
    return nok(code2);
  }
  function afterRightAlignment(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return rowEndDelimiter(code2);
    }
    if (markdownSpace(code2)) {
      effects.enter("whitespace");
      effects.consume(code2);
      return inWhitespaceDelimiter;
    }
    if (code2 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code2);
      effects.exit("tableCellDivider");
      return atDelimiterRowBreak;
    }
    return nok(code2);
  }
  function rowEndDelimiter(code2) {
    effects.exit("tableDelimiterRow");
    if (!hasDash || tableHeaderCount !== align.length) {
      return nok(code2);
    }
    if (code2 === null) {
      return tableClose(code2);
    }
    return effects.check(
      nextPrefixedOrBlank,
      tableClose,
      effects.attempt(
        {
          tokenize: tokenizeRowEnd,
          partial: true
        },
        factorySpace(effects, bodyStart, "linePrefix", 4),
        tableClose
      )
    )(code2);
  }
  function tableClose(code2) {
    effects.exit("table");
    return ok2(code2);
  }
  function bodyStart(code2) {
    effects.enter("tableBody");
    return rowStartBody(code2);
  }
  function rowStartBody(code2) {
    effects.enter("tableRow");
    if (code2 === 124) {
      return cellDividerBody(code2);
    }
    effects.enter("temporaryTableCellContent");
    return inCellContentBody(code2);
  }
  function cellDividerBody(code2) {
    effects.enter("tableCellDivider");
    effects.consume(code2);
    effects.exit("tableCellDivider");
    return cellBreakBody;
  }
  function cellBreakBody(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return atRowEndBody(code2);
    }
    if (markdownSpace(code2)) {
      effects.enter("whitespace");
      effects.consume(code2);
      return inWhitespaceBody;
    }
    if (code2 === 124) {
      return cellDividerBody(code2);
    }
    effects.enter("temporaryTableCellContent");
    return inCellContentBody(code2);
  }
  function inWhitespaceBody(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return inWhitespaceBody;
    }
    effects.exit("whitespace");
    return cellBreakBody(code2);
  }
  function inCellContentBody(code2) {
    if (code2 === null || code2 === 124 || markdownLineEndingOrSpace(code2)) {
      effects.exit("temporaryTableCellContent");
      return cellBreakBody(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? inCellContentEscapeBody : inCellContentBody;
  }
  function inCellContentEscapeBody(code2) {
    if (code2 === 92 || code2 === 124) {
      effects.consume(code2);
      return inCellContentBody;
    }
    return inCellContentBody(code2);
  }
  function atRowEndBody(code2) {
    effects.exit("tableRow");
    if (code2 === null) {
      return tableBodyClose(code2);
    }
    return effects.check(
      nextPrefixedOrBlank,
      tableBodyClose,
      effects.attempt(
        {
          tokenize: tokenizeRowEnd,
          partial: true
        },
        factorySpace(effects, rowStartBody, "linePrefix", 4),
        tableBodyClose
      )
    )(code2);
  }
  function tableBodyClose(code2) {
    effects.exit("tableBody");
    return tableClose(code2);
  }
  function tokenizeRowEnd(effects2, ok3, nok2) {
    return start2;
    function start2(code2) {
      effects2.enter("lineEnding");
      effects2.consume(code2);
      effects2.exit("lineEnding");
      return factorySpace(effects2, prefixed, "linePrefix");
    }
    function prefixed(code2) {
      if (self2.parser.lazy[self2.now().line] || code2 === null || markdownLineEnding(code2)) {
        return nok2(code2);
      }
      const tail = self2.events[self2.events.length - 1];
      if (!self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
        return nok2(code2);
      }
      self2._gfmTableDynamicInterruptHack = true;
      return effects2.check(
        self2.parser.constructs.flow,
        function(code3) {
          self2._gfmTableDynamicInterruptHack = false;
          return nok2(code3);
        },
        function(code3) {
          self2._gfmTableDynamicInterruptHack = false;
          return ok3(code3);
        }
      )(code2);
    }
  }
}
function tokenizeNextPrefixedOrBlank(effects, ok2, nok) {
  let size = 0;
  return start;
  function start(code2) {
    effects.enter("check");
    effects.consume(code2);
    return whitespace;
  }
  function whitespace(code2) {
    if (code2 === -1 || code2 === 32) {
      effects.consume(code2);
      size++;
      return size === 4 ? ok2 : whitespace;
    }
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      return ok2(code2);
    }
    return nok(code2);
  }
}
var gfmTable, nextPrefixedOrBlank;
var init_syntax5 = __esm({
  "node_modules/micromark-extension-gfm-table/lib/syntax.js"() {
    init_micromark_factory_space();
    init_micromark_util_character();
    gfmTable = {
      flow: {
        null: {
          tokenize: tokenizeTable,
          resolve: resolveTable
        }
      }
    };
    nextPrefixedOrBlank = {
      tokenize: tokenizeNextPrefixedOrBlank,
      partial: true
    };
  }
});

// node_modules/micromark-extension-gfm-table/index.js
var init_micromark_extension_gfm_table = __esm({
  "node_modules/micromark-extension-gfm-table/index.js"() {
    init_syntax5();
  }
});

// node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
function tokenizeTasklistCheck(effects, ok2, nok) {
  const self2 = this;
  return open;
  function open(code2) {
    if (self2.previous !== null || !self2._gfmTasklistFirstContentOfListItem) {
      return nok(code2);
    }
    effects.enter("taskListCheck");
    effects.enter("taskListCheckMarker");
    effects.consume(code2);
    effects.exit("taskListCheckMarker");
    return inside;
  }
  function inside(code2) {
    if (markdownLineEndingOrSpace(code2)) {
      effects.enter("taskListCheckValueUnchecked");
      effects.consume(code2);
      effects.exit("taskListCheckValueUnchecked");
      return close2;
    }
    if (code2 === 88 || code2 === 120) {
      effects.enter("taskListCheckValueChecked");
      effects.consume(code2);
      effects.exit("taskListCheckValueChecked");
      return close2;
    }
    return nok(code2);
  }
  function close2(code2) {
    if (code2 === 93) {
      effects.enter("taskListCheckMarker");
      effects.consume(code2);
      effects.exit("taskListCheckMarker");
      effects.exit("taskListCheck");
      return effects.check(
        {
          tokenize: spaceThenNonSpace
        },
        ok2,
        nok
      );
    }
    return nok(code2);
  }
}
function spaceThenNonSpace(effects, ok2, nok) {
  const self2 = this;
  return factorySpace(effects, after, "whitespace");
  function after(code2) {
    const tail = self2.events[self2.events.length - 1];
    return (tail && tail[1].type === "whitespace" || markdownLineEnding(code2)) && code2 !== null ? ok2(code2) : nok(code2);
  }
}
var tasklistCheck, gfmTaskListItem;
var init_syntax6 = __esm({
  "node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js"() {
    init_micromark_factory_space();
    init_micromark_util_character();
    tasklistCheck = {
      tokenize: tokenizeTasklistCheck
    };
    gfmTaskListItem = {
      text: {
        [91]: tasklistCheck
      }
    };
  }
});

// node_modules/micromark-extension-gfm-task-list-item/index.js
var init_micromark_extension_gfm_task_list_item = __esm({
  "node_modules/micromark-extension-gfm-task-list-item/index.js"() {
    init_syntax6();
  }
});

// node_modules/micromark-extension-gfm/index.js
function gfm(options2) {
  return combineExtensions([
    gfmAutolinkLiteral,
    gfmFootnote(),
    gfmStrikethrough(options2),
    gfmTable,
    gfmTaskListItem
  ]);
}
var init_micromark_extension_gfm = __esm({
  "node_modules/micromark-extension-gfm/index.js"() {
    init_micromark_util_combine_extensions();
    init_micromark_extension_gfm_autolink_literal();
    init_micromark_extension_gfm_footnote();
    init_micromark_extension_gfm_strikethrough();
    init_micromark_extension_gfm_table();
    init_micromark_extension_gfm_task_list_item();
  }
});

// node_modules/ccount/index.js
function ccount(value2, character) {
  const source = String(value2);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}
var init_ccount = __esm({
  "node_modules/ccount/index.js"() {
  }
});

// node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var init_escape_string_regexp = __esm({
  "node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js"() {
  }
});

// node_modules/mdast-util-find-and-replace/lib/index.js
function toPairs(schema) {
  const result = [];
  if (typeof schema !== "object") {
    throw new TypeError("Expected array or object as schema");
  }
  if (Array.isArray(schema)) {
    let index = -1;
    while (++index < schema.length) {
      result.push([
        toExpression(schema[index][0]),
        toFunction(schema[index][1])
      ]);
    }
  } else {
    let key;
    for (key in schema) {
      if (own8.call(schema, key)) {
        result.push([toExpression(key), toFunction(schema[key])]);
      }
    }
  }
  return result;
}
function toExpression(find2) {
  return typeof find2 === "string" ? new RegExp(escapeStringRegexp(find2), "g") : find2;
}
function toFunction(replace2) {
  return typeof replace2 === "function" ? replace2 : () => replace2;
}
var own8, findAndReplace;
var init_lib = __esm({
  "node_modules/mdast-util-find-and-replace/lib/index.js"() {
    init_escape_string_regexp();
    init_unist_util_visit_parents();
    init_unist_util_is();
    own8 = {}.hasOwnProperty;
    findAndReplace = function(tree, find2, replace2, options2) {
      let settings;
      let schema;
      if (typeof find2 === "string" || find2 instanceof RegExp) {
        schema = [[find2, replace2]];
        settings = options2;
      } else {
        schema = find2;
        settings = replace2;
      }
      if (!settings) {
        settings = {};
      }
      const ignored = convert(settings.ignore || []);
      const pairs = toPairs(schema);
      let pairIndex = -1;
      while (++pairIndex < pairs.length) {
        visitParents(tree, "text", visitor);
      }
      return tree;
      function visitor(node, parents) {
        let index = -1;
        let grandparent;
        while (++index < parents.length) {
          const parent = parents[index];
          if (ignored(
            parent,
            grandparent ? grandparent.children.indexOf(parent) : void 0,
            grandparent
          )) {
            return;
          }
          grandparent = parent;
        }
        if (grandparent) {
          return handler2(node, parents);
        }
      }
      function handler2(node, parents) {
        const parent = parents[parents.length - 1];
        const find3 = pairs[pairIndex][0];
        const replace3 = pairs[pairIndex][1];
        let start = 0;
        const index = parent.children.indexOf(node);
        let change = false;
        let nodes = [];
        let position;
        find3.lastIndex = 0;
        let match = find3.exec(node.value);
        while (match) {
          position = match.index;
          const matchObject = {
            index: match.index,
            input: match.input,
            stack: [...parents, node]
          };
          let value2 = replace3(...match, matchObject);
          if (typeof value2 === "string") {
            value2 = value2.length > 0 ? { type: "text", value: value2 } : void 0;
          }
          if (value2 !== false) {
            if (start !== position) {
              nodes.push({
                type: "text",
                value: node.value.slice(start, position)
              });
            }
            if (Array.isArray(value2)) {
              nodes.push(...value2);
            } else if (value2) {
              nodes.push(value2);
            }
            start = position + match[0].length;
            change = true;
          }
          if (!find3.global) {
            break;
          }
          match = find3.exec(node.value);
        }
        if (change) {
          if (start < node.value.length) {
            nodes.push({ type: "text", value: node.value.slice(start) });
          }
          parent.children.splice(index, 1, ...nodes);
        } else {
          nodes = [node];
        }
        return index + nodes.length;
      }
    };
  }
});

// node_modules/mdast-util-find-and-replace/index.js
var init_mdast_util_find_and_replace = __esm({
  "node_modules/mdast-util-find-and-replace/index.js"() {
    init_lib();
  }
});

// node_modules/mdast-util-gfm-autolink-literal/index.js
function enterLiteralAutolink(token) {
  this.enter({ type: "link", title: null, url: "", children: [] }, token);
}
function enterLiteralAutolinkValue(token) {
  this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
  this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
  this.config.exit.data.call(this, token);
  const node = this.stack[this.stack.length - 1];
  node.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
  this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
  this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
  findAndReplace(
    tree,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
      [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g, findEmail]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function findUrl(_2, protocol2, domain3, path2, match) {
  let prefix = "";
  if (!previous(match)) {
    return false;
  }
  if (/^w/i.test(protocol2)) {
    domain3 = protocol2 + domain3;
    protocol2 = "";
    prefix = "http://";
  }
  if (!isCorrectDomain(domain3)) {
    return false;
  }
  const parts = splitUrl(domain3 + path2);
  if (!parts[0])
    return false;
  const result = {
    type: "link",
    title: null,
    url: prefix + protocol2 + parts[0],
    children: [{ type: "text", value: protocol2 + parts[0] }]
  };
  if (parts[1]) {
    return [result, { type: "text", value: parts[1] }];
  }
  return result;
}
function findEmail(_2, atext, label, match) {
  if (!previous(match, true) || /[_-\d]$/.test(label)) {
    return false;
  }
  return {
    type: "link",
    title: null,
    url: "mailto:" + atext + "@" + label,
    children: [{ type: "text", value: atext + "@" + label }]
  };
}
function isCorrectDomain(domain3) {
  const parts = domain3.split(".");
  if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
    return false;
  }
  return true;
}
function splitUrl(url) {
  const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
  let closingParenIndex;
  let openingParens;
  let closingParens;
  let trail;
  if (trailExec) {
    url = url.slice(0, trailExec.index);
    trail = trailExec[0];
    closingParenIndex = trail.indexOf(")");
    openingParens = ccount(url, "(");
    closingParens = ccount(url, ")");
    while (closingParenIndex !== -1 && openingParens > closingParens) {
      url += trail.slice(0, closingParenIndex + 1);
      trail = trail.slice(closingParenIndex + 1);
      closingParenIndex = trail.indexOf(")");
      closingParens++;
    }
  }
  return [url, trail];
}
function previous(match, email) {
  const code2 = match.input.charCodeAt(match.index - 1);
  return (match.index === 0 || unicodeWhitespace(code2) || unicodePunctuation(code2)) && (!email || code2 !== 47);
}
var inConstruct, notInConstruct, gfmAutolinkLiteralFromMarkdown, gfmAutolinkLiteralToMarkdown;
var init_mdast_util_gfm_autolink_literal = __esm({
  "node_modules/mdast-util-gfm-autolink-literal/index.js"() {
    init_ccount();
    init_mdast_util_find_and_replace();
    init_micromark_util_character();
    inConstruct = "phrasing";
    notInConstruct = ["autolink", "link", "image", "label"];
    gfmAutolinkLiteralFromMarkdown = {
      transforms: [transformGfmAutolinkLiterals],
      enter: {
        literalAutolink: enterLiteralAutolink,
        literalAutolinkEmail: enterLiteralAutolinkValue,
        literalAutolinkHttp: enterLiteralAutolinkValue,
        literalAutolinkWww: enterLiteralAutolinkValue
      },
      exit: {
        literalAutolink: exitLiteralAutolink,
        literalAutolinkEmail: exitLiteralAutolinkEmail,
        literalAutolinkHttp: exitLiteralAutolinkHttp,
        literalAutolinkWww: exitLiteralAutolinkWww
      }
    };
    gfmAutolinkLiteralToMarkdown = {
      unsafe: [
        {
          character: "@",
          before: "[+\\-.\\w]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ".",
          before: "[Ww]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        { character: ":", before: "[ps]", after: "\\/", inConstruct, notInConstruct }
      ]
    };
  }
});

// node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value2, base) {
  const code2 = Number.parseInt(value2, base);
  if (code2 < 9 || code2 === 11 || code2 > 13 && code2 < 32 || code2 > 126 && code2 < 160 || code2 > 55295 && code2 < 57344 || code2 > 64975 && code2 < 65008 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534 || code2 > 1114111) {
    return "\uFFFD";
  }
  return String.fromCharCode(code2);
}
var init_micromark_util_decode_numeric_character_reference = __esm({
  "node_modules/micromark-util-decode-numeric-character-reference/index.js"() {
  }
});

// node_modules/micromark-util-decode-string/index.js
function decodeString(value2) {
  return value2.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head = $2.charCodeAt(0);
  if (head === 35) {
    const head2 = $2.charCodeAt(1);
    const hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}
var characterEscapeOrReference;
var init_micromark_util_decode_string = __esm({
  "node_modules/micromark-util-decode-string/index.js"() {
    init_decode_named_character_reference();
    init_micromark_util_decode_numeric_character_reference();
    characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  }
});

// node_modules/mdast-util-to-markdown/lib/util/association.js
function association(node) {
  if (node.label || !node.identifier) {
    return node.label || "";
  }
  return decodeString(node.identifier);
}
var init_association = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/association.js"() {
    init_micromark_util_decode_string();
  }
});

// node_modules/mdast-util-to-markdown/lib/util/track.js
function track(options_) {
  const options2 = options_ || {};
  const now = options2.now || {};
  let lineShift = options2.lineShift || 0;
  let line = now.line || 1;
  let column = now.column || 1;
  return { move, current, shift };
  function current() {
    return { now: { line, column }, lineShift };
  }
  function shift(value2) {
    lineShift += value2;
  }
  function move(value2 = "") {
    const chunks = value2.split(/\r?\n|\r/g);
    const tail = chunks[chunks.length - 1];
    line += chunks.length - 1;
    column = chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
    return value2;
  }
}
var init_track = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/track.js"() {
  }
});

// node_modules/mdast-util-to-markdown/lib/util/container-flow.js
function containerFlow(parent, context, safeOptions) {
  const indexStack = context.indexStack;
  const children = parent.children || [];
  const tracker = track(safeOptions);
  const results = [];
  let index = -1;
  indexStack.push(-1);
  while (++index < children.length) {
    const child = children[index];
    indexStack[indexStack.length - 1] = index;
    results.push(
      tracker.move(
        context.handle(child, parent, context, {
          before: "\n",
          after: "\n",
          ...tracker.current()
        })
      )
    );
    if (child.type !== "list") {
      context.bulletLastUsed = void 0;
    }
    if (index < children.length - 1) {
      results.push(tracker.move(between(child, children[index + 1])));
    }
  }
  indexStack.pop();
  return results.join("");
  function between(left, right) {
    let index2 = context.join.length;
    while (index2--) {
      const result = context.join[index2](left, right, parent, context);
      if (result === true || result === 1) {
        break;
      }
      if (typeof result === "number") {
        return "\n".repeat(1 + result);
      }
      if (result === false) {
        return "\n\n<!---->\n\n";
      }
    }
    return "\n\n";
  }
}
var init_container_flow = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/container-flow.js"() {
    init_track();
  }
});

// node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
function indentLines(value2, map) {
  const result = [];
  let start = 0;
  let line = 0;
  let match;
  while (match = eol.exec(value2)) {
    one2(value2.slice(start, match.index));
    result.push(match[0]);
    start = match.index + match[0].length;
    line++;
  }
  one2(value2.slice(start));
  return result.join("");
  function one2(value3) {
    result.push(map(value3, line, !value3));
  }
}
var eol;
var init_indent_lines = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/indent-lines.js"() {
    eol = /\r?\n|\r/g;
  }
});

// node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js
function patternCompile(pattern) {
  if (!pattern._compiled) {
    const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
    pattern._compiled = new RegExp(
      (before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""),
      "g"
    );
  }
  return pattern._compiled;
}
var init_pattern_compile = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js"() {
  }
});

// node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function patternInScope(stack, pattern) {
  return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list, none) {
  if (!list) {
    return none;
  }
  if (typeof list === "string") {
    list = [list];
  }
  let index = -1;
  while (++index < list.length) {
    if (stack.includes(list[index])) {
      return true;
    }
  }
  return false;
}
var init_pattern_in_scope = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js"() {
  }
});

// node_modules/mdast-util-to-markdown/lib/util/safe.js
function safe(context, input, config) {
  const value2 = (config.before || "") + (input || "") + (config.after || "");
  const positions = [];
  const result = [];
  const infos = {};
  let index = -1;
  while (++index < context.unsafe.length) {
    const pattern = context.unsafe[index];
    if (!patternInScope(context.stack, pattern)) {
      continue;
    }
    const expression = patternCompile(pattern);
    let match;
    while (match = expression.exec(value2)) {
      const before = "before" in pattern || Boolean(pattern.atBreak);
      const after = "after" in pattern;
      const position = match.index + (before ? match[1].length : 0);
      if (positions.includes(position)) {
        if (infos[position].before && !before) {
          infos[position].before = false;
        }
        if (infos[position].after && !after) {
          infos[position].after = false;
        }
      } else {
        positions.push(position);
        infos[position] = { before, after };
      }
    }
  }
  positions.sort(numerical);
  let start = config.before ? config.before.length : 0;
  const end = value2.length - (config.after ? config.after.length : 0);
  index = -1;
  while (++index < positions.length) {
    const position = positions[index];
    if (position < start || position >= end) {
      continue;
    }
    if (position + 1 < end && positions[index + 1] === position + 1 && infos[position].after && !infos[position + 1].before && !infos[position + 1].after || positions[index - 1] === position - 1 && infos[position].before && !infos[position - 1].before && !infos[position - 1].after) {
      continue;
    }
    if (start !== position) {
      result.push(escapeBackslashes(value2.slice(start, position), "\\"));
    }
    start = position;
    if (/[!-/:-@[-`{-~]/.test(value2.charAt(position)) && (!config.encode || !config.encode.includes(value2.charAt(position)))) {
      result.push("\\");
    } else {
      result.push(
        "&#x" + value2.charCodeAt(position).toString(16).toUpperCase() + ";"
      );
      start++;
    }
  }
  result.push(escapeBackslashes(value2.slice(start, end), config.after));
  return result.join("");
}
function numerical(a, b) {
  return a - b;
}
function escapeBackslashes(value2, after) {
  const expression = /\\(?=[!-/:-@[-`{-~])/g;
  const positions = [];
  const results = [];
  const whole = value2 + after;
  let index = -1;
  let start = 0;
  let match;
  while (match = expression.exec(whole)) {
    positions.push(match.index);
  }
  while (++index < positions.length) {
    if (start !== positions[index]) {
      results.push(value2.slice(start, positions[index]));
    }
    results.push("\\");
    start = positions[index];
  }
  results.push(value2.slice(start));
  return results.join("");
}
var init_safe = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/safe.js"() {
    init_pattern_compile();
    init_pattern_in_scope();
  }
});

// node_modules/mdast-util-gfm-footnote/index.js
function gfmFootnoteFromMarkdown() {
  return {
    enter: {
      gfmFootnoteDefinition: enterFootnoteDefinition,
      gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      gfmFootnoteCall: enterFootnoteCall,
      gfmFootnoteCallString: enterFootnoteCallString
    },
    exit: {
      gfmFootnoteDefinition: exitFootnoteDefinition,
      gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      gfmFootnoteCall: exitFootnoteCall,
      gfmFootnoteCallString: exitFootnoteCallString
    }
  };
  function enterFootnoteDefinition(token) {
    this.enter(
      { type: "footnoteDefinition", identifier: "", label: "", children: [] },
      token
    );
  }
  function enterFootnoteDefinitionLabelString() {
    this.buffer();
  }
  function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }
  function exitFootnoteDefinition(token) {
    this.exit(token);
  }
  function enterFootnoteCall(token) {
    this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
  }
  function enterFootnoteCallString() {
    this.buffer();
  }
  function exitFootnoteCallString(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }
  function exitFootnoteCall(token) {
    this.exit(token);
  }
}
function gfmFootnoteToMarkdown() {
  footnoteReference.peek = footnoteReferencePeek;
  return {
    unsafe: [{ character: "[", inConstruct: ["phrasing", "label", "reference"] }],
    handlers: { footnoteDefinition, footnoteReference }
  };
  function footnoteReference(node, _2, context, safeOptions) {
    const tracker = track(safeOptions);
    let value2 = tracker.move("[^");
    const exit2 = context.enter("footnoteReference");
    const subexit = context.enter("reference");
    value2 += tracker.move(
      safe(context, association(node), {
        ...tracker.current(),
        before: value2,
        after: "]"
      })
    );
    subexit();
    exit2();
    value2 += tracker.move("]");
    return value2;
  }
  function footnoteReferencePeek() {
    return "[";
  }
  function footnoteDefinition(node, _2, context, safeOptions) {
    const tracker = track(safeOptions);
    let value2 = tracker.move("[^");
    const exit2 = context.enter("footnoteDefinition");
    const subexit = context.enter("label");
    value2 += tracker.move(
      safe(context, association(node), {
        ...tracker.current(),
        before: value2,
        after: "]"
      })
    );
    subexit();
    value2 += tracker.move(
      "]:" + (node.children && node.children.length > 0 ? " " : "")
    );
    tracker.shift(4);
    value2 += tracker.move(
      indentLines(containerFlow(node, context, tracker.current()), map)
    );
    exit2();
    return value2;
    function map(line, index, blank) {
      if (index) {
        return (blank ? "" : "    ") + line;
      }
      return line;
    }
  }
}
var init_mdast_util_gfm_footnote = __esm({
  "node_modules/mdast-util-gfm-footnote/index.js"() {
    init_micromark_util_normalize_identifier();
    init_association();
    init_container_flow();
    init_indent_lines();
    init_safe();
    init_track();
  }
});

// node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
function containerPhrasing(parent, context, safeOptions) {
  const indexStack = context.indexStack;
  const children = parent.children || [];
  const results = [];
  let index = -1;
  let before = safeOptions.before;
  indexStack.push(-1);
  let tracker = track(safeOptions);
  while (++index < children.length) {
    const child = children[index];
    let after;
    indexStack[indexStack.length - 1] = index;
    if (index + 1 < children.length) {
      let handle = context.handle.handlers[children[index + 1].type];
      if (handle && handle.peek)
        handle = handle.peek;
      after = handle ? handle(children[index + 1], parent, context, {
        before: "",
        after: "",
        ...tracker.current()
      }).charAt(0) : "";
    } else {
      after = safeOptions.after;
    }
    if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
      results[results.length - 1] = results[results.length - 1].replace(
        /(\r?\n|\r)$/,
        " "
      );
      before = " ";
      tracker = track(safeOptions);
      tracker.move(results.join(""));
    }
    results.push(
      tracker.move(
        context.handle(child, parent, context, {
          ...tracker.current(),
          before,
          after
        })
      )
    );
    before = results[results.length - 1].slice(-1);
  }
  indexStack.pop();
  return results.join("");
}
var init_container_phrasing = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js"() {
    init_track();
  }
});

// node_modules/mdast-util-gfm-strikethrough/index.js
function enterStrikethrough(token) {
  this.enter({ type: "delete", children: [] }, token);
}
function exitStrikethrough(token) {
  this.exit(token);
}
function handleDelete(node, _2, context, safeOptions) {
  const tracker = track(safeOptions);
  const exit2 = context.enter("emphasis");
  let value2 = tracker.move("~~");
  value2 += containerPhrasing(node, context, {
    ...tracker.current(),
    before: value2,
    after: "~"
  });
  value2 += tracker.move("~~");
  exit2();
  return value2;
}
function peekDelete() {
  return "~";
}
var gfmStrikethroughFromMarkdown, gfmStrikethroughToMarkdown;
var init_mdast_util_gfm_strikethrough = __esm({
  "node_modules/mdast-util-gfm-strikethrough/index.js"() {
    init_container_phrasing();
    init_track();
    gfmStrikethroughFromMarkdown = {
      canContainEols: ["delete"],
      enter: { strikethrough: enterStrikethrough },
      exit: { strikethrough: exitStrikethrough }
    };
    gfmStrikethroughToMarkdown = {
      unsafe: [{ character: "~", inConstruct: "phrasing" }],
      handlers: { delete: handleDelete }
    };
    handleDelete.peek = peekDelete;
  }
});

// node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
function inlineCode(node, _2, context) {
  let value2 = node.value || "";
  let sequence = "`";
  let index = -1;
  while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value2)) {
    sequence += "`";
  }
  if (/[^ \r\n]/.test(value2) && (/^[ \r\n]/.test(value2) && /[ \r\n]$/.test(value2) || /^`|`$/.test(value2))) {
    value2 = " " + value2 + " ";
  }
  while (++index < context.unsafe.length) {
    const pattern = context.unsafe[index];
    const expression = patternCompile(pattern);
    let match;
    if (!pattern.atBreak)
      continue;
    while (match = expression.exec(value2)) {
      let position = match.index;
      if (value2.charCodeAt(position) === 10 && value2.charCodeAt(position - 1) === 13) {
        position--;
      }
      value2 = value2.slice(0, position) + " " + value2.slice(match.index + 1);
    }
  }
  return sequence + value2 + sequence;
}
function inlineCodePeek() {
  return "`";
}
var init_inline_code = __esm({
  "node_modules/mdast-util-to-markdown/lib/handle/inline-code.js"() {
    init_pattern_compile();
    inlineCode.peek = inlineCodePeek;
  }
});

// node_modules/markdown-table/index.js
function markdownTable(table, options2 = {}) {
  const align = (options2.align || []).concat();
  const stringLength = options2.stringLength || defaultStringLength;
  const alignments = [];
  const cellMatrix = [];
  const sizeMatrix = [];
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;
  while (++rowIndex < table.length) {
    const row2 = [];
    const sizes2 = [];
    let columnIndex2 = -1;
    if (table[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table[rowIndex].length;
    }
    while (++columnIndex2 < table[rowIndex].length) {
      const cell = serialize(table[rowIndex][columnIndex2]);
      if (options2.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes2[columnIndex2] = size;
        if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
          longestCellByColumn[columnIndex2] = size;
        }
      }
      row2.push(cell);
    }
    cellMatrix[rowIndex] = row2;
    sizeMatrix[rowIndex] = sizes2;
  }
  let columnIndex = -1;
  if (typeof align === "object" && "length" in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code2 = toAlignment(align);
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code2;
    }
  }
  columnIndex = -1;
  const row = [];
  const sizes = [];
  while (++columnIndex < mostCellsPerRow) {
    const code2 = alignments[columnIndex];
    let before = "";
    let after = "";
    if (code2 === 99) {
      before = ":";
      after = ":";
    } else if (code2 === 108) {
      before = ":";
    } else if (code2 === 114) {
      after = ":";
    }
    let size = options2.alignDelimiters === false ? 1 : Math.max(
      1,
      longestCellByColumn[columnIndex] - before.length - after.length
    );
    const cell = before + "-".repeat(size) + after;
    if (options2.alignDelimiters !== false) {
      size = before.length + size + after.length;
      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }
      sizes[columnIndex] = size;
    }
    row[columnIndex] = cell;
  }
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines = [];
  while (++rowIndex < cellMatrix.length) {
    const row2 = cellMatrix[rowIndex];
    const sizes2 = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line = [];
    while (++columnIndex < mostCellsPerRow) {
      const cell = row2[columnIndex] || "";
      let before = "";
      let after = "";
      if (options2.alignDelimiters !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
        const code2 = alignments[columnIndex];
        if (code2 === 114) {
          before = " ".repeat(size);
        } else if (code2 === 99) {
          if (size % 2) {
            before = " ".repeat(size / 2 + 0.5);
            after = " ".repeat(size / 2 - 0.5);
          } else {
            before = " ".repeat(size / 2);
            after = before;
          }
        } else {
          after = " ".repeat(size);
        }
      }
      if (options2.delimiterStart !== false && !columnIndex) {
        line.push("|");
      }
      if (options2.padding !== false && !(options2.alignDelimiters === false && cell === "") && (options2.delimiterStart !== false || columnIndex)) {
        line.push(" ");
      }
      if (options2.alignDelimiters !== false) {
        line.push(before);
      }
      line.push(cell);
      if (options2.alignDelimiters !== false) {
        line.push(after);
      }
      if (options2.padding !== false) {
        line.push(" ");
      }
      if (options2.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
        line.push("|");
      }
    }
    lines.push(
      options2.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
    );
  }
  return lines.join("\n");
}
function serialize(value2) {
  return value2 === null || value2 === void 0 ? "" : String(value2);
}
function defaultStringLength(value2) {
  return value2.length;
}
function toAlignment(value2) {
  const code2 = typeof value2 === "string" ? value2.codePointAt(0) : 0;
  return code2 === 67 || code2 === 99 ? 99 : code2 === 76 || code2 === 108 ? 108 : code2 === 82 || code2 === 114 ? 114 : 0;
}
var init_markdown_table = __esm({
  "node_modules/markdown-table/index.js"() {
  }
});

// node_modules/mdast-util-gfm-table/lib/index.js
function enterTable(token) {
  const align = token._align;
  this.enter(
    {
      type: "table",
      align: align.map((d) => d === "none" ? null : d),
      children: []
    },
    token
  );
  this.setData("inTable", true);
}
function exitTable(token) {
  this.exit(token);
  this.setData("inTable");
}
function enterRow(token) {
  this.enter({ type: "tableRow", children: [] }, token);
}
function exit(token) {
  this.exit(token);
}
function enterCell(token) {
  this.enter({ type: "tableCell", children: [] }, token);
}
function exitCodeText(token) {
  let value2 = this.resume();
  if (this.getData("inTable")) {
    value2 = value2.replace(/\\([\\|])/g, replace);
  }
  const node = this.stack[this.stack.length - 1];
  node.value = value2;
  this.exit(token);
}
function replace($0, $1) {
  return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options2) {
  const settings = options2 || {};
  const padding = settings.tableCellPadding;
  const alignDelimiters = settings.tablePipeAlign;
  const stringLength = settings.stringLength;
  const around = padding ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: "\n", inConstruct: "tableCell" },
      { atBreak: true, character: "|", after: "[	 :-]" },
      { character: "|", inConstruct: "tableCell" },
      { atBreak: true, character: ":", after: "-" },
      { atBreak: true, character: "-", after: "[:|-]" }
    ],
    handlers: {
      table: handleTable,
      tableRow: handleTableRow,
      tableCell: handleTableCell,
      inlineCode: inlineCodeWithTable
    }
  };
  function handleTable(node, _2, context, safeOptions) {
    return serializeData(
      handleTableAsData(node, context, safeOptions),
      node.align
    );
  }
  function handleTableRow(node, _2, context, safeOptions) {
    const row = handleTableRowAsData(node, context, safeOptions);
    const value2 = serializeData([row]);
    return value2.slice(0, value2.indexOf("\n"));
  }
  function handleTableCell(node, _2, context, safeOptions) {
    const exit2 = context.enter("tableCell");
    const subexit = context.enter("phrasing");
    const value2 = containerPhrasing(node, context, {
      ...safeOptions,
      before: around,
      after: around
    });
    subexit();
    exit2();
    return value2;
  }
  function serializeData(matrix, align) {
    return markdownTable(matrix, {
      align,
      alignDelimiters,
      padding,
      stringLength
    });
  }
  function handleTableAsData(node, context, safeOptions) {
    const children = node.children;
    let index = -1;
    const result = [];
    const subexit = context.enter("table");
    while (++index < children.length) {
      result[index] = handleTableRowAsData(
        children[index],
        context,
        safeOptions
      );
    }
    subexit();
    return result;
  }
  function handleTableRowAsData(node, context, safeOptions) {
    const children = node.children;
    let index = -1;
    const result = [];
    const subexit = context.enter("tableRow");
    while (++index < children.length) {
      result[index] = handleTableCell(
        children[index],
        node,
        context,
        safeOptions
      );
    }
    subexit();
    return result;
  }
  function inlineCodeWithTable(node, parent, context) {
    let value2 = inlineCode(node, parent, context);
    if (context.stack.includes("tableCell")) {
      value2 = value2.replace(/\|/g, "\\$&");
    }
    return value2;
  }
}
var gfmTableFromMarkdown;
var init_lib2 = __esm({
  "node_modules/mdast-util-gfm-table/lib/index.js"() {
    init_container_phrasing();
    init_inline_code();
    init_markdown_table();
    gfmTableFromMarkdown = {
      enter: {
        table: enterTable,
        tableData: enterCell,
        tableHeader: enterCell,
        tableRow: enterRow
      },
      exit: {
        codeText: exitCodeText,
        table: exitTable,
        tableData: exit,
        tableHeader: exit,
        tableRow: exit
      }
    };
  }
});

// node_modules/mdast-util-gfm-table/index.js
var init_mdast_util_gfm_table = __esm({
  "node_modules/mdast-util-gfm-table/index.js"() {
    init_lib2();
  }
});

// node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function checkBullet(context) {
  const marker = context.options.bullet || "*";
  if (marker !== "*" && marker !== "+" && marker !== "-") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  }
  return marker;
}
var init_check_bullet = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/check-bullet.js"() {
  }
});

// node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function checkListItemIndent(context) {
  const style2 = context.options.listItemIndent || "tab";
  if (style2 === 1 || style2 === "1") {
    return "one";
  }
  if (style2 !== "tab" && style2 !== "one" && style2 !== "mixed") {
    throw new Error(
      "Cannot serialize items with `" + style2 + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  }
  return style2;
}
var init_check_list_item_indent = __esm({
  "node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js"() {
  }
});

// node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function listItem(node, parent, context, safeOptions) {
  const listItemIndent = checkListItemIndent(context);
  let bullet = context.bulletCurrent || checkBullet(context);
  if (parent && parent.type === "list" && parent.ordered) {
    bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (context.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + bullet;
  }
  let size = bullet.length + 1;
  if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node.spread)) {
    size = Math.ceil(size / 4) * 4;
  }
  const tracker = track(safeOptions);
  tracker.move(bullet + " ".repeat(size - bullet.length));
  tracker.shift(size);
  const exit2 = context.enter("listItem");
  const value2 = indentLines(
    containerFlow(node, context, tracker.current()),
    map
  );
  exit2();
  return value2;
  function map(line, index, blank) {
    if (index) {
      return (blank ? "" : " ".repeat(size)) + line;
    }
    return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
  }
}
var init_list_item = __esm({
  "node_modules/mdast-util-to-markdown/lib/handle/list-item.js"() {
    init_check_bullet();
    init_check_list_item_indent();
    init_container_flow();
    init_indent_lines();
    init_track();
  }
});

// node_modules/mdast-util-gfm-task-list-item/index.js
function exitCheck(token) {
  const node = this.stack[this.stack.length - 2];
  node.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
  const parent = this.stack[this.stack.length - 2];
  const node = this.stack[this.stack.length - 1];
  const siblings = parent.children;
  const head = node.children[0];
  let index = -1;
  let firstParaghraph;
  if (parent && parent.type === "listItem" && typeof parent.checked === "boolean" && head && head.type === "text") {
    while (++index < siblings.length) {
      const sibling = siblings[index];
      if (sibling.type === "paragraph") {
        firstParaghraph = sibling;
        break;
      }
    }
    if (firstParaghraph === node) {
      head.value = head.value.slice(1);
      if (head.value.length === 0) {
        node.children.shift();
      } else if (node.position && head.position && typeof head.position.start.offset === "number") {
        head.position.start.column++;
        head.position.start.offset++;
        node.position.start = Object.assign({}, head.position.start);
      }
    }
  }
  this.exit(token);
}
function listItemWithTaskListItem(node, parent, context, safeOptions) {
  const head = node.children[0];
  const checkable = typeof node.checked === "boolean" && head && head.type === "paragraph";
  const checkbox = "[" + (node.checked ? "x" : " ") + "] ";
  const tracker = track(safeOptions);
  if (checkable) {
    tracker.move(checkbox);
  }
  let value2 = listItem(node, parent, context, {
    ...safeOptions,
    ...tracker.current()
  });
  if (checkable) {
    value2 = value2.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
  }
  return value2;
  function check($0) {
    return $0 + checkbox;
  }
}
var gfmTaskListItemFromMarkdown, gfmTaskListItemToMarkdown;
var init_mdast_util_gfm_task_list_item = __esm({
  "node_modules/mdast-util-gfm-task-list-item/index.js"() {
    init_list_item();
    init_track();
    gfmTaskListItemFromMarkdown = {
      exit: {
        taskListCheckValueChecked: exitCheck,
        taskListCheckValueUnchecked: exitCheck,
        paragraph: exitParagraphWithTaskListItem
      }
    };
    gfmTaskListItemToMarkdown = {
      unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
      handlers: { listItem: listItemWithTaskListItem }
    };
  }
});

// node_modules/mdast-util-gfm/lib/index.js
function gfmFromMarkdown() {
  return [
    gfmAutolinkLiteralFromMarkdown,
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown,
    gfmTableFromMarkdown,
    gfmTaskListItemFromMarkdown
  ];
}
function gfmToMarkdown(options2) {
  return {
    extensions: [
      gfmAutolinkLiteralToMarkdown,
      gfmFootnoteToMarkdown(),
      gfmStrikethroughToMarkdown,
      gfmTableToMarkdown(options2),
      gfmTaskListItemToMarkdown
    ]
  };
}
var init_lib3 = __esm({
  "node_modules/mdast-util-gfm/lib/index.js"() {
    init_mdast_util_gfm_autolink_literal();
    init_mdast_util_gfm_footnote();
    init_mdast_util_gfm_strikethrough();
    init_mdast_util_gfm_table();
    init_mdast_util_gfm_task_list_item();
  }
});

// node_modules/mdast-util-gfm/index.js
var init_mdast_util_gfm = __esm({
  "node_modules/mdast-util-gfm/index.js"() {
    init_lib3();
  }
});

// node_modules/remark-gfm/index.js
var remark_gfm_exports = {};
__export(remark_gfm_exports, {
  default: () => remarkGfm
});
function remarkGfm(options2 = {}) {
  const data = this.data();
  add("micromarkExtensions", gfm(options2));
  add("fromMarkdownExtensions", gfmFromMarkdown());
  add("toMarkdownExtensions", gfmToMarkdown(options2));
  function add(field, value2) {
    const list = data[field] ? data[field] : data[field] = [];
    list.push(value2);
  }
}
var init_remark_gfm = __esm({
  "node_modules/remark-gfm/index.js"() {
    init_micromark_extension_gfm();
    init_mdast_util_gfm();
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options2) {
      if (defineProperty && options2.name === "__proto__") {
        defineProperty(target, options2.name, {
          enumerable: true,
          configurable: true,
          value: options2.newValue,
          writable: true
        });
      } else {
        target[options2.name] = options2.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module2.exports = function extend2() {
      var options2, name, src, copy, copyIsArray, clone2;
      var target = arguments[0];
      var i2 = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i2 = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i2 < length; ++i2) {
        options2 = arguments[i2];
        if (options2 != null) {
          for (name in options2) {
            src = getProperty(target, name);
            copy = getProperty(options2, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone2 = src && isArray(src) ? src : [];
                } else {
                  clone2 = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend2(deep, clone2, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/hast-util-has-property/index.js
function hasProperty2(node, name) {
  var value2 = name && node && typeof node === "object" && node.type === "element" && node.properties && own9.call(node.properties, name) && node.properties[name];
  return value2 !== null && value2 !== void 0 && value2 !== false;
}
var own9;
var init_hast_util_has_property = __esm({
  "node_modules/hast-util-has-property/index.js"() {
    own9 = {}.hasOwnProperty;
  }
});

// node_modules/hast-util-is-element/index.js
function anyFactory2(tests) {
  const checks2 = [];
  let index = -1;
  while (++index < tests.length) {
    checks2[index] = convertElement(tests[index]);
  }
  return castFactory2(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks2.length) {
      if (checks2[index2].call(this, ...parameters)) {
        return true;
      }
    }
    return false;
  }
}
function tagNameFactory(check) {
  return tagName;
  function tagName(node) {
    return element(node) && node.tagName === check;
  }
}
function castFactory2(check) {
  return assertion;
  function assertion(node, ...parameters) {
    return element(node) && Boolean(check.call(this, node, ...parameters));
  }
}
function element(node) {
  return Boolean(
    node && typeof node === "object" && node.type === "element" && typeof node.tagName === "string"
  );
}
var convertElement;
var init_hast_util_is_element = __esm({
  "node_modules/hast-util-is-element/index.js"() {
    convertElement = function(test) {
      if (test === void 0 || test === null) {
        return element;
      }
      if (typeof test === "string") {
        return tagNameFactory(test);
      }
      if (typeof test === "object") {
        return anyFactory2(test);
      }
      if (typeof test === "function") {
        return castFactory2(test);
      }
      throw new Error("Expected function, string, or array as test");
    };
  }
});

// node_modules/rehype-autolink-headings/lib/index.js
function rehypeAutolinkHeadings(options2 = {}) {
  let props = options2.properties;
  const behavior = options2.behaviour || options2.behavior || "prepend";
  const content = options2.content || contentDefaults;
  const group = options2.group;
  const is = convertElement(options2.test);
  let method;
  if (behavior === "wrap") {
    method = wrap;
  } else if (behavior === "before" || behavior === "after") {
    method = around;
  } else {
    if (!props) {
      props = { ariaHidden: "true", tabIndex: -1 };
    }
    method = inject;
  }
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (headingRank(node) && hasProperty2(node, "id") && is(node, index, parent)) {
        return method(node, index, parent);
      }
    });
  };
  function inject(node) {
    node.children[behavior === "prepend" ? "unshift" : "push"](
      create3(node, (0, import_extend.default)(true, {}, props), toChildren(content, node))
    );
    return [SKIP];
  }
  function around(node, index, parent) {
    if (typeof index !== "number" || !parent)
      return;
    const link = create3(
      node,
      (0, import_extend.default)(true, {}, props),
      toChildren(content, node)
    );
    let nodes = behavior === "before" ? [link, node] : [node, link];
    if (group) {
      const grouping = toNode(group, node);
      if (grouping && !Array.isArray(grouping) && grouping.type === "element") {
        grouping.children = nodes;
        nodes = [grouping];
      }
    }
    parent.children.splice(index, 1, ...nodes);
    return [SKIP, index + nodes.length];
  }
  function wrap(node) {
    node.children = [create3(node, (0, import_extend.default)(true, {}, props), node.children)];
    return [SKIP];
  }
  function toChildren(value2, node) {
    const result = toNode(value2, node);
    return Array.isArray(result) ? result : [result];
  }
  function toNode(value2, node) {
    if (typeof value2 === "function")
      return value2(node);
    return (0, import_extend.default)(true, Array.isArray(value2) ? [] : {}, value2);
  }
  function create3(node, props2, children) {
    return {
      type: "element",
      tagName: "a",
      properties: Object.assign({}, props2, {
        href: "#" + (node.properties || {}).id
      }),
      children
    };
  }
}
var import_extend, contentDefaults;
var init_lib4 = __esm({
  "node_modules/rehype-autolink-headings/lib/index.js"() {
    import_extend = __toESM(require_extend(), 1);
    init_hast_util_has_property();
    init_hast_util_heading_rank();
    init_hast_util_is_element();
    init_unist_util_visit();
    contentDefaults = {
      type: "element",
      tagName: "span",
      properties: { className: ["icon", "icon-link"] },
      children: []
    };
  }
});

// node_modules/rehype-autolink-headings/index.js
var rehype_autolink_headings_exports = {};
__export(rehype_autolink_headings_exports, {
  default: () => rehypeAutolinkHeadings
});
var init_rehype_autolink_headings = __esm({
  "node_modules/rehype-autolink-headings/index.js"() {
    init_lib4();
  }
});

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports, function(exports2) {
      "use strict";
      const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
      function noop2() {
        return void 0;
      }
      function getGlobals() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function typeIsObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection = noop2;
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseResolve = Promise.resolve.bind(originalPromise);
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value2) {
        return originalPromiseResolve(value2);
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === "function") {
          return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(void 0);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
      })();
      function reflectCall(F2, V, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V, args);
      }
      function promiseCall(F2, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F2, V, args));
        } catch (value2) {
          return promiseRejectedWith(value2);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(element2) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element2);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element2 = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element2;
        }
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve4, reject) => {
          reader._closedPromise_resolve = resolve4;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
      const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
      const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
      const PullSteps = SymbolPolyfill("[[PullSteps]]");
      const NumberIsFinite = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject(x2, context) {
        if (!isObject(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value2) {
        return Number(value2);
      }
      function censorNegativeZero(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart(x2) {
        return censorNegativeZero(MathTrunc(x2));
      }
      function convertUnsignedLongLongWithEnforceRange(value2, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value2);
        x2 = censorNegativeZero(x2);
        if (!NumberIsFinite(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream(x2, context) {
        if (!IsReadableStream(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve4, reject) => {
            resolvePromise = resolve4;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value2) {
          const returnSteps = () => this._returnSteps(value2);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("iterate"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve4, reject) => {
            resolvePromise = resolve4;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value2) {
          if (this._isFinished) {
            return Promise.resolve({ value: value2, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("finish iterating"));
          }
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value2);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value: value2, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value: value2, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value2) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value2);
        }
      };
      if (AsyncIteratorPrototype !== void 0) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      }
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a6) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      function TransferArrayBuffer(O) {
        return O;
      }
      function IsDetachedBuffer(O) {
        return false;
      }
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value2, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value: value2, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer))
            ;
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableByteStreamControllerError(controller, e2);
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
          elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        const buffer = TransferArrayBuffer(view.buffer);
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          bytesFilled: 0,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled > 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer))
            ;
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, (r3) => {
          ReadableByteStreamControllerError(controller, r3);
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve4, reject) => {
            resolvePromise = resolve4;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readIntoRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close2 = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close2 === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close2, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x2, context) {
        if (!IsWritableStream(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal2(value2) {
        if (typeof value2 !== "object" || value2 === null) {
          return false;
        }
        try {
          return typeof value2.aborted === "boolean";
        } catch (_a6) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a6;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a6 = stream._writableStreamController._abortController) === null || _a6 === void 0 ? void 0 : _a6.abort();
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve4, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve4,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve4, reject) => {
          const closeRequest = {
            _resolve: resolve4,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve4, reject) => {
          const writeRequest = {
            _resolve: resolve4,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e2);
        }
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (r3) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r3);
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let writeAlgorithm = () => promiseResolvedWith(void 0);
        let closeAlgorithm = () => promiseResolvedWith(void 0);
        let abortAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value2 = PeekQueueValue(controller);
        if (value2 === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value2);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve4, reject) => {
          writer._closedPromise_resolve = resolve4;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve4, reject) => {
          writer._readyPromise_resolve = resolve4;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a6) {
          return false;
        }
      }
      function createDOMExceptionPolyfill() {
        const ctor = function DOMException3(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve4, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = new DOMException$1("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve4(void 0);
            }
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableStreamDefaultControllerError(controller, e2);
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, (r3) => {
          ReadableStreamDefaultControllerError(controller, r3);
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve4) => {
          resolveCancelPromise = resolve4;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r3) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r3);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r3);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve4) => {
          resolveCancelPromise = resolve4;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r3) => {
            if (thisReader !== reader) {
              return;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r3);
            ReadableByteStreamControllerError(branch2._readableStreamController, r3);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertReaderOptions(options2, context) {
        assertDictionary(options2, context);
        const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertIteratorOptions(options2, context) {
        assertDictionary(options2, context);
        const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options2, context) {
        assertDictionary(options2, context);
        const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
        const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
        const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
        const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal2(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options2 = convertReaderOptions(rawOptions, "First parameter");
          if (options2.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options2 = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options2;
          try {
            options2 = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
        }
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options2 = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
        }
      }
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      if (typeof SymbolPolyfill.asyncIterator === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
          value: ReadableStream2.prototype.values,
          writable: true,
          configurable: true
        });
      }
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop2);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
          reader._readRequests = new SimpleQueue();
        }
      }
      function ReadableStreamError(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e2);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._errorSteps(e2);
          });
          reader._readRequests = new SimpleQueue();
        } else {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._errorSteps(e2);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      try {
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a6) {
      }
      class ByteLengthQueuingStrategy {
        constructor(options2) {
          assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
          options2 = convertQueuingStrategyInit(options2, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
        }
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      try {
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a6) {
      }
      class CountQueuingStrategy {
        constructor(options2) {
          assertRequiredArgument(options2, 1, "CountQueuingStrategy");
          options2 = convertQueuingStrategyInit(options2, "First parameter");
          this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
        }
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve4) => {
            startPromise_resolve = resolve4;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          TransformStreamErrorWritableAndUnblockWrite(stream, reason);
          return promiseResolvedWith(void 0);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream;
      }
      function TransformStreamError(stream, e2) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve4) => {
          stream._backpressureChangePromise_resolve = resolve4;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
          try {
            TransformStreamDefaultControllerEnqueue(controller, chunk);
            return promiseResolvedWith(void 0);
          } catch (transformResultE) {
            return promiseRejectedWith(transformResultE);
          }
        };
        let flushAlgorithm = () => promiseResolvedWith(void 0);
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e2) {
        TransformStreamError(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r3) => {
          TransformStreamError(controller._controlledTransformStream, r3);
          throw r3;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        TransformStreamError(stream, reason);
        return promiseResolvedWith(void 0);
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        return transformPromiseWith(flushPromise, () => {
          if (readable._state === "errored") {
            throw readable._storedError;
          }
          ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, (r3) => {
          TransformStreamError(stream, r3);
          throw readable._storedError;
        });
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports2.CountQueuingStrategy = CountQueuingStrategy;
      exports2.ReadableByteStreamController = ReadableByteStreamController;
      exports2.ReadableStream = ReadableStream2;
      exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports2.TransformStream = TransformStream;
      exports2.TransformStreamDefaultController = TransformStreamDefaultController;
      exports2.WritableStream = WritableStream;
      exports2.WritableStreamDefaultController = WritableStreamDefaultController;
      exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _parts, _type, _size, _endings, _a3, _Blob, Blob, fetch_blob_default;
var init_fetch_blob = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = (_a3 = class {
      constructor(blobParts = [], options2 = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        __privateAdd(this, _endings, "transparent");
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options2 !== "object" && typeof options2 !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options2 === null)
          options2 = {};
        const encoder = new TextEncoder();
        for (const element2 of blobParts) {
          let part;
          if (ArrayBuffer.isView(element2)) {
            part = new Uint8Array(element2.buffer.slice(element2.byteOffset, element2.byteOffset + element2.byteLength));
          } else if (element2 instanceof ArrayBuffer) {
            part = new Uint8Array(element2.slice(0));
          } else if (element2 instanceof _a3) {
            part = element2;
          } else {
            part = encoder.encode(`${element2}`);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        __privateSet(this, _endings, `${options2.endings === void 0 ? "transparent" : options2.endings}`);
        const type = options2.type === void 0 ? "" : String(options2.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a3([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _endings = new WeakMap(), _a3);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    fetch_blob_default = Blob;
  }
});

// node_modules/fetch-blob/file.js
var _lastModified, _name, _a4, _File, File, file_default;
var init_file = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = (_a4 = class extends fetch_blob_default {
      constructor(fileBits, fileName, options2 = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options2);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options2 === null)
          options2 = {};
        const lastModified = options2.lastModified === void 0 ? Date.now() : Number(options2.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a4);
    File = _File;
    file_default = File;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F2, B = fetch_blob_default) {
  var b = `${r2()}${r2()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c2 = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c2.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c2.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c2.push(`--${b}--`);
  return new B(c2, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h2, r2, m, f, e, x, _d, _a5, FormData;
var init_esm_min = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h2 } = Symbol);
    r2 = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c2) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c2 = c2 !== void 0 ? c2 + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c2 || b[t] == "blob" ? new file_default([b], c2, b) : b] : [a, b + ""]);
    e = (c2, f3) => (f3 ? c2 : c2.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a5 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h2](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c2 = 0; c2 < l; c2++)
          if (b[c2][0] === a)
            return b[c2][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c2) => c2[0] === a && b.push(c2[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c2, d] of this)
          a.call(b, d, c2, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c2 = true;
        a = f(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c2 && (c2 = !b.push(a)) : b.push(d);
        });
        c2 && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a5);
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "node_modules/node-domexception/index.js"(exports, module2) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module2.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
var import_node_fs5, import_node_domexception, stat, _path, _start, _BlobDataItem, BlobDataItem;
var init_from = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_fs5 = require("fs");
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = import_node_fs5.promises);
    _BlobDataItem = class {
      constructor(options2) {
        __privateAdd(this, _path, void 0);
        __privateAdd(this, _start, void 0);
        __privateSet(this, _path, options2.path);
        __privateSet(this, _start, options2.start);
        this.size = options2.size;
        this.lastModified = options2.lastModified;
      }
      slice(start, end) {
        return new _BlobDataItem({
          path: __privateGet(this, _path),
          lastModified: this.lastModified,
          size: end - start,
          start: __privateGet(this, _start) + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(__privateGet(this, _path));
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* (0, import_node_fs5.createReadStream)(__privateGet(this, _path), {
          start: __privateGet(this, _start),
          end: __privateGet(this, _start) + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
    BlobDataItem = _BlobDataItem;
    _path = new WeakMap();
    _start = new WeakMap();
  }
});

// node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code2) => {
    return String.fromCharCode(code2);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser2 = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser2.onPartBegin = function() {
    parser2.onPartData = onPartData;
    parser2.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser2.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser2.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser2.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser2.onPartData = appendToFile;
        parser2.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser2.write(chunk);
  }
  parser2.end();
  return formData;
}
var s2, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s2 = 0;
    S = {
      START_BOUNDARY: s2++,
      HEADER_FIELD_START: s2++,
      HEADER_FIELD: s2++,
      HEADER_VALUE_START: s2++,
      HEADER_VALUE: s2++,
      HEADER_VALUE_ALMOST_DONE: s2++,
      HEADERS_ALMOST_DONE: s2++,
      PART_DATA_START: s2++,
      PART_DATA: s2++,
      END: s2++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c2) => c2 | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c2;
        let cl;
        const mark2 = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c2 = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c2 === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c2 !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c2 === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c2 === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c2 !== boundary[index + 2]) {
                index = -2;
              }
              if (c2 === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark2("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c2 === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c2 === HYPHEN) {
                break;
              }
              if (c2 === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c2);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c2 === SPACE) {
                break;
              }
              mark2("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c2 === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c2 !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c2 !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark2("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c2 = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c2) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c2 === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c2 === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c2 === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c2 === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c2;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark2("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// packages/qwik-city/buildtime/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  extendConfig: () => extendConfig,
  qwikCity: () => qwikCity
});
module.exports = __toCommonJS(vite_exports);

// packages/qwik-city/buildtime/vite/config.ts
var import_vite = require("vite");
function extendConfig(baseConfigExport, serverConfigExport) {
  return async (env) => {
    let resolvedBase = await baseConfigExport;
    if (typeof resolvedBase === "function") {
      resolvedBase = await resolvedBase(env);
    }
    let resolvedServer = await serverConfigExport;
    if (typeof resolvedServer === "function") {
      resolvedServer = await resolvedServer(env);
    }
    return (0, import_vite.mergeConfig)(resolvedBase, resolvedServer);
  };
}

// packages/qwik-city/buildtime/markdown/mdx.ts
var import_source_map = require("source-map");

// node_modules/github-slugger/regex.js
var regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;

// node_modules/github-slugger/index.js
var own = Object.hasOwnProperty;
var BananaSlug = class {
  constructor() {
    this.occurrences;
    this.reset();
  }
  slug(value2, maintainCase) {
    const self2 = this;
    let result = slug(value2, maintainCase === true);
    const originalSlug = result;
    while (own.call(self2.occurrences, result)) {
      self2.occurrences[originalSlug]++;
      result = originalSlug + "-" + self2.occurrences[originalSlug];
    }
    self2.occurrences[result] = 0;
    return result;
  }
  reset() {
    this.occurrences = /* @__PURE__ */ Object.create(null);
  }
};
function slug(value2, maintainCase) {
  if (typeof value2 !== "string")
    return "";
  if (!maintainCase)
    value2 = value2.toLowerCase();
  return value2.replace(regex, "").replace(/ /g, "-");
}

// node_modules/is-plain-obj/index.js
function isPlainObject(value2) {
  if (typeof value2 !== "object" || value2 === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value2);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value2) && !(Symbol.iterator in value2);
}

// node_modules/estree-util-value-to-estree/index.js
function valueToEstree(value2, options2 = {}) {
  if (value2 === void 0 || value2 === Number.POSITIVE_INFINITY || Number.isNaN(value2)) {
    return { type: "Identifier", name: String(value2) };
  }
  if (value2 == null || typeof value2 === "string" || typeof value2 === "boolean") {
    return { type: "Literal", value: value2 };
  }
  if (typeof value2 === "bigint") {
    return value2 >= 0 ? { type: "Literal", value: value2, bigint: String(value2) } : {
      type: "UnaryExpression",
      operator: "-",
      prefix: true,
      argument: valueToEstree(-value2, options2)
    };
  }
  if (typeof value2 === "number") {
    return value2 >= 0 ? { type: "Literal", value: value2 } : {
      type: "UnaryExpression",
      operator: "-",
      prefix: true,
      argument: valueToEstree(-value2, options2)
    };
  }
  if (typeof value2 === "symbol") {
    if (value2.description && value2 === Symbol.for(value2.description)) {
      return {
        type: "CallExpression",
        optional: false,
        callee: {
          type: "MemberExpression",
          computed: false,
          optional: false,
          object: { type: "Identifier", name: "Symbol" },
          property: { type: "Identifier", name: "for" }
        },
        arguments: [valueToEstree(value2.description, options2)]
      };
    }
    throw new TypeError(`Only global symbols are supported, got: ${String(value2)}`);
  }
  if (Array.isArray(value2)) {
    const elements = [];
    for (let i2 = 0; i2 < value2.length; i2 += 1) {
      elements.push(i2 in value2 ? valueToEstree(value2[i2], options2) : null);
    }
    return { type: "ArrayExpression", elements };
  }
  if (value2 instanceof Boolean || value2 instanceof Number || value2 instanceof String) {
    return {
      type: "NewExpression",
      callee: { type: "Identifier", name: value2.constructor.name },
      arguments: [valueToEstree(value2.valueOf())]
    };
  }
  if (value2 instanceof RegExp) {
    return {
      type: "Literal",
      value: value2,
      regex: { pattern: value2.source, flags: value2.flags }
    };
  }
  if (value2 instanceof Date) {
    return {
      type: "NewExpression",
      callee: { type: "Identifier", name: "Date" },
      arguments: [valueToEstree(value2.getTime(), options2)]
    };
  }
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value2)) {
    return {
      type: "CallExpression",
      optional: false,
      callee: {
        type: "MemberExpression",
        computed: false,
        optional: false,
        object: { type: "Identifier", name: "Buffer" },
        property: { type: "Identifier", name: "from" }
      },
      arguments: [valueToEstree([...value2])]
    };
  }
  if (value2 instanceof BigInt64Array || value2 instanceof BigUint64Array || value2 instanceof Float32Array || value2 instanceof Float64Array || value2 instanceof Int8Array || value2 instanceof Int16Array || value2 instanceof Int32Array || value2 instanceof Map || value2 instanceof Set || value2 instanceof Uint8Array || value2 instanceof Uint8ClampedArray || value2 instanceof Uint16Array || value2 instanceof Uint32Array) {
    return {
      type: "NewExpression",
      callee: { type: "Identifier", name: value2.constructor.name },
      arguments: [valueToEstree([...value2], options2)]
    };
  }
  if (value2 instanceof URL || value2 instanceof URLSearchParams) {
    return {
      type: "NewExpression",
      callee: { type: "Identifier", name: value2.constructor.name },
      arguments: [valueToEstree(String(value2), options2)]
    };
  }
  if (options2.instanceAsObject || isPlainObject(value2)) {
    return {
      type: "ObjectExpression",
      properties: Reflect.ownKeys(value2).map((key) => ({
        type: "Property",
        method: false,
        shorthand: false,
        computed: typeof key !== "string",
        kind: "init",
        key: valueToEstree(key, options2),
        value: valueToEstree(value2[key], options2)
      }))
    };
  }
  throw new TypeError(`Unsupported value: ${String(value2)}`);
}

// packages/qwik-city/buildtime/markdown/rehype.ts
init_hast_util_heading_rank();

// node_modules/hast-util-to-string/index.js
function toString(node) {
  if ("children" in node) {
    return all(node);
  }
  return "value" in node ? node.value : "";
}
function one(node) {
  if (node.type === "text") {
    return node.value;
  }
  return "children" in node ? all(node) : "";
}
function all(node) {
  let index = -1;
  const result = [];
  while (++index < node.children.length) {
    result[index] = one(node.children[index]);
  }
  return result.join("");
}

// packages/qwik-city/buildtime/markdown/rehype.ts
init_unist_util_visit();

// packages/qwik-city/utils/fs.ts
var import_node_path = require("path");

// packages/qwik-city/utils/format.ts
function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
}
function addError(ctx, e2) {
  ctx.diagnostics.push({
    type: "error",
    message: e2 ? String(e2.stack || e2) : "Error"
  });
}

// packages/qwik-city/utils/pathname.ts
function normalizePathname(pathname, basePathname, trailingSlash) {
  if (typeof pathname === "string") {
    pathname = pathname.trim();
    if (pathname !== "") {
      try {
        pathname = pathname.replace(/\/+/g, "/");
        if (pathname.startsWith("/")) {
          pathname = pathname.slice(1);
        }
        pathname = new URL(basePathname + pathname, `https://qwik.builder.io`).pathname;
        if (pathname !== basePathname) {
          if (trailingSlash) {
            if (!pathname.endsWith("/")) {
              const segments = pathname.split("/");
              const lastSegment = segments[segments.length - 1];
              if (!lastSegment.includes(".")) {
                pathname += "/";
              }
            }
          } else {
            if (pathname.endsWith("/")) {
              pathname = pathname.slice(0, pathname.length - 1);
            }
          }
        }
        return pathname;
      } catch (e2) {
        console.error(e2);
      }
    }
  }
  return null;
}
function isSameOriginUrl(url) {
  if (typeof url === "string") {
    url = url.trim();
    if (url !== "") {
      const firstChar = url.charAt(0);
      if (firstChar !== "/" && firstChar !== ".") {
        if (firstChar === "#") {
          return false;
        }
        const i2 = url.indexOf(":");
        if (i2 > -1) {
          const protocol2 = url.slice(0, i2).toLowerCase();
          return !PROTOCOLS[protocol2];
        }
      }
      return true;
    }
  }
  return false;
}
var PROTOCOLS = {
  https: true,
  http: true,
  about: true,
  javascript: true,
  file: true
};

// packages/qwik-city/utils/fs.ts
function parseRouteIndexName(extlessName) {
  let layoutName = "";
  const layoutStop = extlessName.endsWith("!");
  if (layoutStop) {
    extlessName = extlessName.slice(0, extlessName.length - 1);
  }
  const namedLayoutParts = extlessName.split("@");
  if (namedLayoutParts.length > 1) {
    namedLayoutParts.shift();
    layoutName = namedLayoutParts.join("@");
  }
  return { layoutName, layoutStop };
}
function getPathnameFromDirPath(opts, dirPath) {
  const relFilePath = (0, import_node_path.relative)(opts.routesDir, dirPath);
  const pathname = normalizePath(relFilePath);
  return normalizePathname(pathname, opts.basePathname, opts.trailingSlash).split("/").filter((segment) => !isGroupedLayoutName(segment)).join("/");
}
function getMenuPathname(opts, filePath) {
  let pathname = normalizePath((0, import_node_path.relative)(opts.routesDir, filePath));
  pathname = `/` + normalizePath((0, import_node_path.dirname)(pathname));
  return normalizePathname(pathname, opts.basePathname, opts.trailingSlash);
}
function getExtension(fileName) {
  if (typeof fileName === "string") {
    const parts = fileName.trim().toLowerCase().split(".");
    if (parts.length > 1) {
      const ext = parts.pop().split("?")[0].split("#")[0];
      if (ext === "ts" && parts.pop() === "d") {
        return ".d.ts";
      }
      return "." + ext;
    }
  }
  return "";
}
function removeExtension(fileName) {
  if (typeof fileName === "string") {
    fileName = fileName.trim();
    const ext = getExtension(fileName);
    return fileName.slice(0, fileName.length - ext.length);
  }
  return "";
}
function normalizePath(path2) {
  path2 = (0, import_node_path.normalize)(path2);
  const isExtendedLengthPath = /^\\\\\?\\/.test(path2);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path2);
  if (isExtendedLengthPath || hasNonAscii) {
    return path2;
  }
  path2 = path2.replace(/\\/g, "/");
  if (path2.endsWith("/")) {
    path2 = path2.slice(0, path2.length - 1);
  }
  return path2;
}
function createFileId(routesDir, fsPath) {
  const ids = [];
  for (let i2 = 0; i2 < 25; i2++) {
    let baseName = removeExtension((0, import_node_path.basename)(fsPath));
    baseName = baseName.replace(/[\W_]+/g, "");
    if (baseName === "") {
      baseName = "Q" + i2;
    } else if (!isNaN(baseName.charAt(0))) {
      baseName = "Q" + baseName;
    }
    ids.push(toTitleCase(baseName));
    fsPath = normalizePath((0, import_node_path.dirname)(fsPath));
    if (fsPath === routesDir) {
      break;
    }
  }
  if (ids.length > 1 && ids[0] === "Index") {
    ids.shift();
  }
  return ids.reverse().join("");
}
var PAGE_MODULE_EXTS = {
  ".tsx": true,
  ".jsx": true
};
var MODULE_EXTS = {
  ".ts": true,
  ".js": true
};
var MARKDOWN_EXTS = {
  ".md": true,
  ".mdx": true
};
function isPageModuleExt(ext) {
  return !!PAGE_MODULE_EXTS[ext];
}
function isModuleExt(ext) {
  return !!MODULE_EXTS[ext];
}
function isMarkdownExt(ext) {
  return !!MARKDOWN_EXTS[ext];
}
function isPageExt(ext) {
  return !!PAGE_MODULE_EXTS[ext] || !!MARKDOWN_EXTS[ext];
}
function isMenuFileName(fileName) {
  return fileName === "menu.md";
}
function isServiceWorkerName(extlessName) {
  return extlessName === "service-worker";
}
function isEntryName(extlessName) {
  return extlessName === "entry";
}
function isErrorName(extlessName) {
  try {
    const statusCode = parseInt(extlessName, 10);
    return statusCode >= 400 && statusCode <= 599;
  } catch (e2) {
  }
  return false;
}
function isGroupedLayoutName(dirName, warn = true) {
  if (dirName.startsWith("__")) {
    if (warn) {
      console.warn(
        `Grouped (pathless) layout "${dirName}" should use the "(${dirName.slice(
          2
        )})" directory name instead. Prefixing a directory with "__" has been deprecated and will be removed in future verions.`
      );
    }
    return true;
  }
  return dirName.startsWith("(") && dirName.endsWith(")");
}

// packages/qwik-city/buildtime/markdown/frontmatter.ts
init_unist_util_visit();
var import_yaml = __toESM(require_dist(), 1);
function parseFrontmatter(ctx) {
  return (mdast, vfile) => {
    const attrs = {};
    visit(mdast, "yaml", (node) => {
      const parsedAttrs = parseFrontmatterAttrs(node.value);
      for (const k in parsedAttrs) {
        attrs[k] = parsedAttrs[k];
      }
    });
    if (Object.keys(attrs).length > 0) {
      ctx.frontmatter.set(normalizePath(vfile.path), attrs);
    }
  };
}
function parseFrontmatterAttrs(yaml2) {
  if (typeof yaml2 === "string") {
    yaml2 = yaml2.trim();
    if (yaml2 !== "") {
      return (0, import_yaml.parse)(yaml2);
    }
  }
  return null;
}
var metaNames = {
  author: true,
  creator: true,
  "color-scheme": true,
  description: true,
  generator: true,
  keywords: true,
  publisher: true,
  referrer: true,
  robots: true,
  "theme-color": true,
  viewport: true
};
function frontmatterAttrsToDocumentHead(attrs) {
  if (attrs != null && typeof attrs === "object") {
    const attrNames = Object.keys(attrs);
    if (attrNames.length > 0) {
      const head = {
        title: "",
        meta: [],
        styles: [],
        links: [],
        frontmatter: {}
      };
      for (const attrName of attrNames) {
        const attrValue = attrs[attrName];
        if (attrValue != null) {
          if (attrName === "title") {
            head.title = attrValue.toString();
          } else if (metaNames[attrName]) {
            head.meta.push({
              name: attrName,
              content: attrValue.toString()
            });
          } else {
            head.frontmatter[attrName] = attrValue;
          }
        }
      }
      return head;
    }
  }
  return null;
}

// packages/qwik-city/buildtime/markdown/markdown-url.ts
var import_node_path2 = require("path");

// packages/qwik-city/buildtime/routing/source-file.ts
function getSourceFile(fileName) {
  const ext = getExtension(fileName);
  const extlessName = removeExtension(fileName);
  const isPageModule = isPageModuleExt(ext);
  const isModule = isModuleExt(ext);
  const isMarkdown = isMarkdownExt(ext);
  let type = null;
  if (extlessName.startsWith("index") && (isPageModule || isModule || isMarkdown)) {
    type = "route";
  } else if (extlessName.startsWith("layout") && (isPageModule || isModule)) {
    type = "layout";
  } else if (isEntryName(extlessName) && isModule) {
    type = "entry";
  } else if (isErrorName(extlessName) && (isPageModule || isMarkdown)) {
    type = "error";
  } else if (isMenuFileName(fileName)) {
    type = "menu";
  } else if (isModule && isServiceWorkerName(extlessName)) {
    type = "service-worker";
  }
  if (type !== null) {
    const sourceFileName = {
      type,
      extlessName,
      ext
    };
    return sourceFileName;
  }
  return null;
}

// packages/qwik-city/buildtime/markdown/markdown-url.ts
var import_node_fs = require("fs");
function getMarkdownRelativeUrl(opts, containingFilePath, url, checkFileExists) {
  if (typeof url !== "string" || !isSameOriginUrl(url)) {
    return url;
  }
  const querySplit = url.split("?");
  const hashSplit = url.split("#");
  const strippedUrl = url.split("?")[0].split("#")[0];
  if (isMarkdownExt(getExtension(strippedUrl))) {
    const isAbsolute3 = strippedUrl.startsWith("/");
    const parts = normalizePath(strippedUrl).split("/").filter((p) => p.length > 0);
    const filePath = isAbsolute3 ? (0, import_node_path2.join)(opts.routesDir, ...parts) : (0, import_node_path2.join)((0, import_node_path2.dirname)(containingFilePath), ...parts);
    if (checkFileExists && !(0, import_node_fs.existsSync)(filePath)) {
      console.warn(
        `
The link "${url}", found within "${containingFilePath}" does not have a matching source file.
`
      );
    }
    const fileName = (0, import_node_path2.basename)(filePath);
    const sourceFileName = getSourceFile(fileName);
    if (sourceFileName) {
      const mdDirPath = (0, import_node_path2.dirname)(filePath);
      let pathname = getPathnameFromDirPath(opts, mdDirPath);
      if (querySplit.length > 1) {
        pathname += "?" + querySplit[1];
      } else if (hashSplit.length > 1) {
        pathname += "#" + hashSplit[1];
      }
      return pathname;
    }
  }
  return url;
}

// packages/qwik-city/buildtime/markdown/rehype.ts
function rehypePage(ctx) {
  return (ast, vfile) => {
    const mdast = ast;
    const sourcePath = normalizePath(vfile.path);
    updateContentLinks(mdast, ctx.opts, sourcePath);
    exportFrontmatter(ctx, mdast, sourcePath);
    exportContentHead(ctx, mdast, sourcePath);
    exportContentHeadings(mdast);
  };
}
function updateContentLinks(mdast, opts, sourcePath) {
  visit(mdast, "element", (node) => {
    const tagName = node && node.type === "element" && node.tagName.toLowerCase();
    if (tagName === "a") {
      const href = (node.properties && node.properties.href || "").trim();
      if (isSameOriginUrl(href)) {
        const ext = getExtension(href);
        if (isMarkdownExt(ext)) {
          node.properties.href = getMarkdownRelativeUrl(
            opts,
            sourcePath,
            node.properties.href,
            true
          );
        }
      }
    }
  });
}
function exportFrontmatter(ctx, mdast, sourcePath) {
  const attrs = ctx.frontmatter.get(sourcePath);
  createExport(mdast, "frontmatter", attrs);
}
function exportContentHead(ctx, mdast, sourcePath) {
  const attrs = ctx.frontmatter.get(sourcePath);
  const head = frontmatterAttrsToDocumentHead(attrs);
  if (head) {
    createExport(mdast, "head", head);
  }
}
function exportContentHeadings(mdast) {
  const slugs = new BananaSlug();
  const headings = [];
  visit(mdast, "element", (node) => {
    const level = headingRank(node);
    if (level && node.properties) {
      const text2 = toString(node);
      if (!hasProperty(node, "id")) {
        node.properties.id = slugs.slug(text2);
      }
      headings.push({
        text: text2,
        id: node.properties.id,
        level
      });
    }
  });
  if (headings.length > 0) {
    createExport(mdast, "headings", headings);
  }
}
function createExport(mdast, identifierName, val) {
  const mdxjsEsm = {
    type: "mdxjsEsm",
    value: "",
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ExportNamedDeclaration",
            source: null,
            specifiers: [],
            declaration: {
              type: "VariableDeclaration",
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name: identifierName },
                  init: valueToEstree(val)
                }
              ]
            }
          }
        ]
      }
    }
  };
  mdast.children.unshift(mdxjsEsm);
}
var own2 = {}.hasOwnProperty;
function hasProperty(node, propName) {
  const value2 = propName && node && typeof node === "object" && node.type === "element" && node.properties && own2.call(node.properties, propName) && node.properties[propName];
  return value2 != null && value2 !== false;
}

// packages/qwik-city/buildtime/markdown/syntax-highlight.ts
init_unist_util_visit();

// node_modules/refractor/lang/clike.js
clike.displayName = "clike";
clike.aliases = [];
function clike(Prism2) {
  Prism2.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: true,
      inside: {
        punctuation: /[.\\]/
      }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
  };
}

// node_modules/refractor/lang/c.js
c.displayName = "c";
c.aliases = [];
function c(Prism2) {
  Prism2.register(clike);
  Prism2.languages.c = Prism2.languages.extend("clike", {
    comment: {
      pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: true
    },
    string: {
      pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
      lookbehind: true
    },
    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
    function: /\b[a-z_]\w*(?=\s*\()/i,
    number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
  });
  Prism2.languages.insertBefore("c", "string", {
    char: {
      pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
      greedy: true
    }
  });
  Prism2.languages.insertBefore("c", "string", {
    macro: {
      pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: true,
      greedy: true,
      alias: "property",
      inside: {
        string: [
          {
            pattern: /^(#\s*include\s*)<[^>]+>/,
            lookbehind: true
          },
          Prism2.languages.c["string"]
        ],
        char: Prism2.languages.c["char"],
        comment: Prism2.languages.c["comment"],
        "macro-name": [
          {
            pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
            lookbehind: true
          },
          {
            pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
            lookbehind: true,
            alias: "function"
          }
        ],
        directive: {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: true,
          alias: "keyword"
        },
        "directive-hash": /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: {
          pattern: /\S[\s\S]*/,
          inside: Prism2.languages.c
        }
      }
    }
  });
  Prism2.languages.insertBefore("c", "function", {
    constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
  });
  delete Prism2.languages.c["boolean"];
}

// node_modules/refractor/lang/cpp.js
cpp.displayName = "cpp";
cpp.aliases = [];
function cpp(Prism2) {
  Prism2.register(c);
  (function(Prism3) {
    var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
    var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(
      /<keyword>/g,
      function() {
        return keyword.source;
      }
    );
    Prism3.languages.cpp = Prism3.languages.extend("c", {
      "class-name": [
        {
          pattern: RegExp(
            /(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(
              /<keyword>/g,
              function() {
                return keyword.source;
              }
            )
          ),
          lookbehind: true
        },
        /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
        /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
        /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
      ],
      keyword,
      number: {
        pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
        greedy: true
      },
      operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
      boolean: /\b(?:false|true)\b/
    });
    Prism3.languages.insertBefore("cpp", "string", {
      module: {
        pattern: RegExp(
          /(\b(?:import|module)\s+)/.source + "(?:" + /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + "|" + /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(
            /<mod-name>/g,
            function() {
              return modName;
            }
          ) + ")"
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          string: /^[<"][\s\S]+/,
          operator: /:/,
          punctuation: /\./
        }
      },
      "raw-string": {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: "string",
        greedy: true
      }
    });
    Prism3.languages.insertBefore("cpp", "keyword", {
      "generic-function": {
        pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
        inside: {
          function: /^\w+/,
          generic: {
            pattern: /<[\s\S]+/,
            alias: "class-name",
            inside: Prism3.languages.cpp
          }
        }
      }
    });
    Prism3.languages.insertBefore("cpp", "operator", {
      "double-colon": {
        pattern: /::/,
        alias: "punctuation"
      }
    });
    Prism3.languages.insertBefore("cpp", "class-name", {
      "base-clause": {
        pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: true,
        greedy: true,
        inside: Prism3.languages.extend("cpp", {})
      }
    });
    Prism3.languages.insertBefore(
      "inside",
      "double-colon",
      {
        "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
      },
      Prism3.languages.cpp["base-clause"]
    );
  })(Prism2);
}

// node_modules/refractor/lang/arduino.js
arduino.displayName = "arduino";
arduino.aliases = ["ino"];
function arduino(Prism2) {
  Prism2.register(cpp);
  Prism2.languages.arduino = Prism2.languages.extend("cpp", {
    keyword: /\b(?:String|array|bool|boolean|break|byte|case|catch|continue|default|do|double|else|finally|for|function|goto|if|in|instanceof|int|integer|long|loop|new|null|return|setup|string|switch|throw|try|void|while|word)\b/,
    constant: /\b(?:ANALOG_MESSAGE|DEFAULT|DIGITAL_MESSAGE|EXTERNAL|FIRMATA_STRING|HIGH|INPUT|INPUT_PULLUP|INTERNAL|INTERNAL1V1|INTERNAL2V56|LED_BUILTIN|LOW|OUTPUT|REPORT_ANALOG|REPORT_DIGITAL|SET_PIN_MODE|SYSEX_START|SYSTEM_RESET)\b/,
    builtin: /\b(?:Audio|BSSID|Bridge|Client|Console|EEPROM|Esplora|EsploraTFT|Ethernet|EthernetClient|EthernetServer|EthernetUDP|File|FileIO|FileSystem|Firmata|GPRS|GSM|GSMBand|GSMClient|GSMModem|GSMPIN|GSMScanner|GSMServer|GSMVoiceCall|GSM_SMS|HttpClient|IPAddress|IRread|Keyboard|KeyboardController|LiquidCrystal|LiquidCrystal_I2C|Mailbox|Mouse|MouseController|PImage|Process|RSSI|RobotControl|RobotMotor|SD|SPI|SSID|Scheduler|Serial|Server|Servo|SoftwareSerial|Stepper|Stream|TFT|Task|USBHost|WiFi|WiFiClient|WiFiServer|WiFiUDP|Wire|YunClient|YunServer|abs|addParameter|analogRead|analogReadResolution|analogReference|analogWrite|analogWriteResolution|answerCall|attach|attachGPRS|attachInterrupt|attached|autoscroll|available|background|beep|begin|beginPacket|beginSD|beginSMS|beginSpeaker|beginTFT|beginTransmission|beginWrite|bit|bitClear|bitRead|bitSet|bitWrite|blink|blinkVersion|buffer|changePIN|checkPIN|checkPUK|checkReg|circle|cityNameRead|cityNameWrite|clear|clearScreen|click|close|compassRead|config|connect|connected|constrain|cos|countryNameRead|countryNameWrite|createChar|cursor|debugPrint|delay|delayMicroseconds|detach|detachInterrupt|digitalRead|digitalWrite|disconnect|display|displayLogos|drawBMP|drawCompass|encryptionType|end|endPacket|endSMS|endTransmission|endWrite|exists|exitValue|fill|find|findUntil|flush|gatewayIP|get|getAsynchronously|getBand|getButton|getCurrentCarrier|getIMEI|getKey|getModifiers|getOemKey|getPINUsed|getResult|getSignalStrength|getSocket|getVoiceCallStatus|getXChange|getYChange|hangCall|height|highByte|home|image|interrupts|isActionDone|isDirectory|isListening|isPIN|isPressed|isValid|keyPressed|keyReleased|keyboardRead|knobRead|leftToRight|line|lineFollowConfig|listen|listenOnLocalhost|loadImage|localIP|lowByte|macAddress|maintain|map|max|messageAvailable|micros|millis|min|mkdir|motorsStop|motorsWrite|mouseDragged|mouseMoved|mousePressed|mouseReleased|move|noAutoscroll|noBlink|noBuffer|noCursor|noDisplay|noFill|noInterrupts|noListenOnLocalhost|noStroke|noTone|onReceive|onRequest|open|openNextFile|overflow|parseCommand|parseFloat|parseInt|parsePacket|pauseMode|peek|pinMode|playFile|playMelody|point|pointTo|position|pow|prepare|press|print|printFirmwareVersion|printVersion|println|process|processInput|pulseIn|put|random|randomSeed|read|readAccelerometer|readBlue|readButton|readBytes|readBytesUntil|readGreen|readJoystickButton|readJoystickSwitch|readJoystickX|readJoystickY|readLightSensor|readMessage|readMicrophone|readNetworks|readRed|readSlider|readString|readStringUntil|readTemperature|ready|rect|release|releaseAll|remoteIP|remoteNumber|remotePort|remove|requestFrom|retrieveCallingNumber|rewindDirectory|rightToLeft|rmdir|robotNameRead|robotNameWrite|run|runAsynchronously|runShellCommand|runShellCommandAsynchronously|running|scanNetworks|scrollDisplayLeft|scrollDisplayRight|seek|sendAnalog|sendDigitalPortPair|sendDigitalPorts|sendString|sendSysex|serialEvent|setBand|setBitOrder|setClockDivider|setCursor|setDNS|setDataMode|setFirmwareVersion|setMode|setPINUsed|setSpeed|setTextSize|setTimeout|shiftIn|shiftOut|shutdown|sin|size|sqrt|startLoop|step|stop|stroke|subnetMask|switchPIN|tan|tempoWrite|text|tone|transfer|tuneWrite|turn|updateIR|userNameRead|userNameWrite|voiceCall|waitContinue|width|write|writeBlue|writeGreen|writeJSON|writeMessage|writeMicroseconds|writeRGB|writeRed|yield)\b/
  });
  Prism2.languages.ino = Prism2.languages.arduino;
}

// node_modules/refractor/lang/bash.js
bash.displayName = "bash";
bash.aliases = ["sh", "shell"];
function bash(Prism2) {
  ;
  (function(Prism3) {
    var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
    var commandAfterHeredoc = {
      pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
      lookbehind: true,
      alias: "punctuation",
      inside: null
    };
    var insideString = {
      bash: commandAfterHeredoc,
      environment: {
        pattern: RegExp("\\$" + envVars),
        alias: "constant"
      },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: true,
          inside: {
            variable: [
              {
                pattern: /(^\$\(\([\s\S]+)\)\)/,
                lookbehind: true
              },
              /^\$\(\(/
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
            punctuation: /\(\(?|\)\)?|,|;/
          }
        },
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: true,
          inside: {
            variable: /^\$\(|^`|\)$|`$/
          }
        },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: true,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp("(\\{)" + envVars),
              lookbehind: true,
              alias: "constant"
            }
          }
        },
        /\$(?:\w+|[#?*!@$])/
      ],
      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
    };
    Prism3.languages.bash = {
      shebang: {
        pattern: /^#!\s*\/.*/,
        alias: "important"
      },
      comment: {
        pattern: /(^|[^"{\\$])#.*/,
        lookbehind: true
      },
      "function-name": [
        {
          pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
          lookbehind: true,
          alias: "function"
        },
        {
          pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
          alias: "function"
        }
      ],
      "for-or-select": {
        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
        alias: "variable",
        lookbehind: true
      },
      "assign-left": {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
        inside: {
          environment: {
            pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
            lookbehind: true,
            alias: "constant"
          }
        },
        alias: "variable",
        lookbehind: true
      },
      parameter: {
        pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
        alias: "variable",
        lookbehind: true
      },
      string: [
        {
          pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
          lookbehind: true,
          greedy: true,
          inside: insideString
        },
        {
          pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
          lookbehind: true,
          greedy: true,
          inside: {
            bash: commandAfterHeredoc
          }
        },
        {
          pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
          lookbehind: true,
          greedy: true,
          inside: insideString
        },
        {
          pattern: /(^|[^$\\])'[^']*'/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
          greedy: true,
          inside: {
            entity: insideString.entity
          }
        }
      ],
      environment: {
        pattern: RegExp("\\$?" + envVars),
        alias: "constant"
      },
      variable: insideString.variable,
      function: {
        pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      keyword: {
        pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      builtin: {
        pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
        lookbehind: true,
        alias: "class-name"
      },
      boolean: {
        pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      "file-descriptor": {
        pattern: /\B&\d\b/,
        alias: "important"
      },
      operator: {
        pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
        inside: {
          "file-descriptor": {
            pattern: /^\d/,
            alias: "important"
          }
        }
      },
      punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      number: {
        pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
        lookbehind: true
      }
    };
    commandAfterHeredoc.inside = Prism3.languages.bash;
    var toBeCopied = [
      "comment",
      "function-name",
      "for-or-select",
      "assign-left",
      "parameter",
      "string",
      "environment",
      "function",
      "keyword",
      "builtin",
      "boolean",
      "file-descriptor",
      "operator",
      "punctuation",
      "number"
    ];
    var inside = insideString.variable[1].inside;
    for (var i2 = 0; i2 < toBeCopied.length; i2++) {
      inside[toBeCopied[i2]] = Prism3.languages.bash[toBeCopied[i2]];
    }
    Prism3.languages.sh = Prism3.languages.bash;
    Prism3.languages.shell = Prism3.languages.bash;
  })(Prism2);
}

// node_modules/refractor/lang/csharp.js
csharp.displayName = "csharp";
csharp.aliases = ["cs", "dotnet"];
function csharp(Prism2) {
  Prism2.register(clike);
  (function(Prism3) {
    function replace2(pattern, replacements) {
      return pattern.replace(/<<(\d+)>>/g, function(m2, index) {
        return "(?:" + replacements[+index] + ")";
      });
    }
    function re(pattern, replacements, flags) {
      return RegExp(replace2(pattern, replacements), flags || "");
    }
    function nested(pattern, depthLog2) {
      for (var i2 = 0; i2 < depthLog2; i2++) {
        pattern = pattern.replace(/<<self>>/g, function() {
          return "(?:" + pattern + ")";
        });
      }
      return pattern.replace(/<<self>>/g, "[^\\s\\S]");
    }
    var keywordKinds = {
      type: "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
      typeDeclaration: "class enum interface record struct",
      contextual: "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
      other: "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield"
    };
    function keywordsToPattern(words) {
      return "\\b(?:" + words.trim().replace(/ /g, "|") + ")\\b";
    }
    var typeDeclarationKeywords = keywordsToPattern(
      keywordKinds.typeDeclaration
    );
    var keywords = RegExp(
      keywordsToPattern(
        keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other
      )
    );
    var nonTypeKeywords = keywordsToPattern(
      keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other
    );
    var nonContextualKeywords = keywordsToPattern(
      keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.other
    );
    var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2);
    var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
    var name = /@?\b[A-Za-z_]\w*\b/.source;
    var genericName = replace2(/<<0>>(?:\s*<<1>>)?/.source, [name, generic]);
    var identifier = replace2(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [
      nonTypeKeywords,
      genericName
    ]);
    var array = /\[\s*(?:,\s*)*\]/.source;
    var typeExpressionWithoutTuple = replace2(
      /<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source,
      [identifier, array]
    );
    var tupleElement = replace2(
      /[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source,
      [generic, nestedRound, array]
    );
    var tuple = replace2(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
    var typeExpression = replace2(
      /(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source,
      [tuple, identifier, array]
    );
    var typeInside = {
      keyword: keywords,
      punctuation: /[<>()?,.:[\]]/
    };
    var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source;
    var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
    var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
    Prism3.languages.csharp = Prism3.languages.extend("clike", {
      string: [
        {
          pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
          lookbehind: true,
          greedy: true
        },
        {
          pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
          lookbehind: true,
          greedy: true
        }
      ],
      "class-name": [
        {
          pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [
            identifier
          ]),
          lookbehind: true,
          inside: typeInside
        },
        {
          pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [
            name,
            typeExpression
          ]),
          lookbehind: true,
          inside: typeInside
        },
        {
          pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
          lookbehind: true
        },
        {
          pattern: re(/(\b<<0>>\s+)<<1>>/.source, [
            typeDeclarationKeywords,
            genericName
          ]),
          lookbehind: true,
          inside: typeInside
        },
        {
          pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
          lookbehind: true,
          inside: typeInside
        },
        {
          pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
          lookbehind: true
        },
        {
          pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [
            typeExpressionWithoutTuple
          ]),
          lookbehind: true,
          inside: typeInside
        },
        {
          pattern: re(
            /\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source,
            [typeExpression, nonContextualKeywords, name]
          ),
          inside: typeInside
        }
      ],
      keyword: keywords,
      number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
      operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
      punctuation: /\?\.?|::|[{}[\];(),.:]/
    });
    Prism3.languages.insertBefore("csharp", "number", {
      range: {
        pattern: /\.\./,
        alias: "operator"
      }
    });
    Prism3.languages.insertBefore("csharp", "punctuation", {
      "named-parameter": {
        pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
        lookbehind: true,
        alias: "punctuation"
      }
    });
    Prism3.languages.insertBefore("csharp", "class-name", {
      namespace: {
        pattern: re(
          /(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source,
          [name]
        ),
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      },
      "type-expression": {
        pattern: re(
          /(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source,
          [nestedRound]
        ),
        lookbehind: true,
        alias: "class-name",
        inside: typeInside
      },
      "return-type": {
        pattern: re(
          /<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source,
          [typeExpression, identifier]
        ),
        inside: typeInside,
        alias: "class-name"
      },
      "constructor-invocation": {
        pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
        lookbehind: true,
        inside: typeInside,
        alias: "class-name"
      },
      "generic-method": {
        pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [name, generic]),
        inside: {
          function: re(/^<<0>>/.source, [name]),
          generic: {
            pattern: RegExp(generic),
            alias: "class-name",
            inside: typeInside
          }
        }
      },
      "type-list": {
        pattern: re(
          /\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source,
          [
            typeDeclarationKeywords,
            genericName,
            name,
            typeExpression,
            keywords.source,
            nestedRound,
            /\bnew\s*\(\s*\)/.source
          ]
        ),
        lookbehind: true,
        inside: {
          "record-arguments": {
            pattern: re(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [
              genericName,
              nestedRound
            ]),
            lookbehind: true,
            greedy: true,
            inside: Prism3.languages.csharp
          },
          keyword: keywords,
          "class-name": {
            pattern: RegExp(typeExpression),
            greedy: true,
            inside: typeInside
          },
          punctuation: /[,()]/
        }
      },
      preprocessor: {
        pattern: /(^[\t ]*)#.*/m,
        lookbehind: true,
        alias: "property",
        inside: {
          directive: {
            pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
            lookbehind: true,
            alias: "keyword"
          }
        }
      }
    });
    var regularStringOrCharacter = regularString + "|" + character;
    var regularStringCharacterOrComment = replace2(
      /\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source,
      [regularStringOrCharacter]
    );
    var roundExpression = nested(
      replace2(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [
        regularStringCharacterOrComment
      ]),
      2
    );
    var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
    var attr = replace2(/<<0>>(?:\s*\(<<1>>*\))?/.source, [
      identifier,
      roundExpression
    ]);
    Prism3.languages.insertBefore("csharp", "class-name", {
      attribute: {
        pattern: re(
          /((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source,
          [attrTarget, attr]
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          target: {
            pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
            alias: "keyword"
          },
          "attribute-arguments": {
            pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
            inside: Prism3.languages.csharp
          },
          "class-name": {
            pattern: RegExp(identifier),
            inside: {
              punctuation: /\./
            }
          },
          punctuation: /[:,]/
        }
      }
    });
    var formatString = /:[^}\r\n]+/.source;
    var mInterpolationRound = nested(
      replace2(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [
        regularStringCharacterOrComment
      ]),
      2
    );
    var mInterpolation = replace2(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [
      mInterpolationRound,
      formatString
    ]);
    var sInterpolationRound = nested(
      replace2(
        /[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source,
        [regularStringOrCharacter]
      ),
      2
    );
    var sInterpolation = replace2(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [
      sInterpolationRound,
      formatString
    ]);
    function createInterpolationInside(interpolation, interpolationRound) {
      return {
        interpolation: {
          pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
          lookbehind: true,
          inside: {
            "format-string": {
              pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [
                interpolationRound,
                formatString
              ]),
              lookbehind: true,
              inside: {
                punctuation: /^:/
              }
            },
            punctuation: /^\{|\}$/,
            expression: {
              pattern: /[\s\S]+/,
              alias: "language-csharp",
              inside: Prism3.languages.csharp
            }
          }
        },
        string: /[\s\S]+/
      };
    }
    Prism3.languages.insertBefore("csharp", "string", {
      "interpolation-string": [
        {
          pattern: re(
            /(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source,
            [mInterpolation]
          ),
          lookbehind: true,
          greedy: true,
          inside: createInterpolationInside(mInterpolation, mInterpolationRound)
        },
        {
          pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [
            sInterpolation
          ]),
          lookbehind: true,
          greedy: true,
          inside: createInterpolationInside(sInterpolation, sInterpolationRound)
        }
      ],
      char: {
        pattern: RegExp(character),
        greedy: true
      }
    });
    Prism3.languages.dotnet = Prism3.languages.cs = Prism3.languages.csharp;
  })(Prism2);
}

// node_modules/refractor/lang/markup.js
markup.displayName = "markup";
markup.aliases = ["atom", "html", "mathml", "rss", "ssml", "svg", "xml"];
function markup(Prism2) {
  Prism2.languages.markup = {
    comment: {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: true
    },
    prolog: {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: true
    },
    doctype: {
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null
        },
        string: {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /[^\s<>'"]+/
      }
    },
    cdata: {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: true
    },
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }
            ]
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      },
      /&#x?[\da-f]{1,8};/i
    ]
  };
  Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
  Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
  Prism2.hooks.add("wrap", function(env) {
    if (env.type === "entity") {
      env.attributes["title"] = env.content.value.replace(/&amp;/, "&");
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
    value: function addInlined(tagName, lang) {
      var includedCdataInside = {};
      includedCdataInside["language-" + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism2.languages[lang]
      };
      includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
      var inside = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside["language-" + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism2.languages[lang]
      };
      var def = {};
      def[tagName] = {
        pattern: RegExp(
          /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
            /__/g,
            function() {
              return tagName;
            }
          ),
          "i"
        ),
        lookbehind: true,
        greedy: true,
        inside
      };
      Prism2.languages.insertBefore("markup", "cdata", def);
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
    value: function(attrName, lang) {
      Prism2.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          "i"
        ),
        lookbehind: true,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: true,
                alias: [lang, "language-" + lang],
                inside: Prism2.languages[lang]
              },
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  });
  Prism2.languages.html = Prism2.languages.markup;
  Prism2.languages.mathml = Prism2.languages.markup;
  Prism2.languages.svg = Prism2.languages.markup;
  Prism2.languages.xml = Prism2.languages.extend("markup", {});
  Prism2.languages.ssml = Prism2.languages.xml;
  Prism2.languages.atom = Prism2.languages.xml;
  Prism2.languages.rss = Prism2.languages.xml;
}

// node_modules/refractor/lang/css.js
css.displayName = "css";
css.aliases = [];
function css(Prism2) {
  ;
  (function(Prism3) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism3.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: RegExp(
          "@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source
        ),
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: true,
            alias: "selector"
          },
          keyword: {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: true
          }
        }
      },
      url: {
        pattern: RegExp(
          "\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)",
          "i"
        ),
        greedy: true,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: {
            pattern: RegExp("^" + string.source + "$"),
            alias: "url"
          }
        }
      },
      selector: {
        pattern: RegExp(
          `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"
        ),
        lookbehind: true
      },
      string: {
        pattern: string,
        greedy: true
      },
      property: {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: true
      },
      important: /!important\b/i,
      function: {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: true
      },
      punctuation: /[(){};:,]/
    };
    Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
    var markup2 = Prism3.languages.markup;
    if (markup2) {
      markup2.tag.addInlined("style", "css");
      markup2.tag.addAttribute("style", "css");
    }
  })(Prism2);
}

// node_modules/refractor/lang/diff.js
diff.displayName = "diff";
diff.aliases = [];
function diff(Prism2) {
  ;
  (function(Prism3) {
    Prism3.languages.diff = {
      coord: [
        /^(?:\*{3}|-{3}|\+{3}).*$/m,
        /^@@.*@@$/m,
        /^\d.*$/m
      ]
    };
    var PREFIXES = {
      "deleted-sign": "-",
      "deleted-arrow": "<",
      "inserted-sign": "+",
      "inserted-arrow": ">",
      unchanged: " ",
      diff: "!"
    };
    Object.keys(PREFIXES).forEach(function(name) {
      var prefix = PREFIXES[name];
      var alias2 = [];
      if (!/^\w+$/.test(name)) {
        alias2.push(/\w+/.exec(name)[0]);
      }
      if (name === "diff") {
        alias2.push("bold");
      }
      Prism3.languages.diff[name] = {
        pattern: RegExp(
          "^(?:[" + prefix + "].*(?:\r\n?|\n|(?![\\s\\S])))+",
          "m"
        ),
        alias: alias2,
        inside: {
          line: {
            pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
            lookbehind: true
          },
          prefix: {
            pattern: /[\s\S]/,
            alias: /\w+/.exec(name)[0]
          }
        }
      };
    });
    Object.defineProperty(Prism3.languages.diff, "PREFIXES", {
      value: PREFIXES
    });
  })(Prism2);
}

// node_modules/refractor/lang/go.js
go.displayName = "go";
go.aliases = [];
function go(Prism2) {
  Prism2.register(clike);
  Prism2.languages.go = Prism2.languages.extend("clike", {
    string: {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
      lookbehind: true,
      greedy: true
    },
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    boolean: /\b(?:_|false|iota|nil|true)\b/,
    number: [
      /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
      /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
      /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
    ],
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
  });
  Prism2.languages.insertBefore("go", "string", {
    char: {
      pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
      greedy: true
    }
  });
  delete Prism2.languages.go["class-name"];
}

// node_modules/refractor/lang/ini.js
ini.displayName = "ini";
ini.aliases = [];
function ini(Prism2) {
  Prism2.languages.ini = {
    comment: {
      pattern: /(^[ \f\t\v]*)[#;][^\n\r]*/m,
      lookbehind: true
    },
    section: {
      pattern: /(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,
      lookbehind: true,
      inside: {
        "section-name": {
          pattern: /(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,
          lookbehind: true,
          alias: "selector"
        },
        punctuation: /\[|\]/
      }
    },
    key: {
      pattern: /(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,
      lookbehind: true,
      alias: "attr-name"
    },
    value: {
      pattern: /(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,
      lookbehind: true,
      alias: "attr-value",
      inside: {
        "inner-value": {
          pattern: /^("|').+(?=\1$)/,
          lookbehind: true
        }
      }
    },
    punctuation: /=/
  };
}

// node_modules/refractor/lang/java.js
java.displayName = "java";
java.aliases = [];
function java(Prism2) {
  Prism2.register(clike);
  (function(Prism3) {
    var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
    var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
    var className = {
      pattern: RegExp(
        /(^|[^\w.])/.source + classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source
      ),
      lookbehind: true,
      inside: {
        namespace: {
          pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
          inside: {
            punctuation: /\./
          }
        },
        punctuation: /\./
      }
    };
    Prism3.languages.java = Prism3.languages.extend("clike", {
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
        lookbehind: true,
        greedy: true
      },
      "class-name": [
        className,
        {
          pattern: RegExp(
            /(^|[^\w.])/.source + classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source
          ),
          lookbehind: true,
          inside: className.inside
        },
        {
          pattern: RegExp(
            /(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + classNamePrefix + /[A-Z]\w*\b/.source
          ),
          lookbehind: true,
          inside: className.inside
        }
      ],
      keyword: keywords,
      function: [
        Prism3.languages.clike.function,
        {
          pattern: /(::\s*)[a-z_]\w*/,
          lookbehind: true
        }
      ],
      number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
      operator: {
        pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
        lookbehind: true
      },
      constant: /\b[A-Z][A-Z_\d]+\b/
    });
    Prism3.languages.insertBefore("java", "string", {
      "triple-quoted-string": {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: true,
        alias: "string"
      },
      char: {
        pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
        greedy: true
      }
    });
    Prism3.languages.insertBefore("java", "class-name", {
      annotation: {
        pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
        lookbehind: true,
        alias: "punctuation"
      },
      generics: {
        pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
        inside: {
          "class-name": className,
          keyword: keywords,
          punctuation: /[<>(),.:]/,
          operator: /[?&|]/
        }
      },
      import: [
        {
          pattern: RegExp(
            /(\bimport\s+)/.source + classNamePrefix + /(?:[A-Z]\w*|\*)(?=\s*;)/.source
          ),
          lookbehind: true,
          inside: {
            namespace: className.inside.namespace,
            punctuation: /\./,
            operator: /\*/,
            "class-name": /\w+/
          }
        },
        {
          pattern: RegExp(
            /(\bimport\s+static\s+)/.source + classNamePrefix + /(?:\w+|\*)(?=\s*;)/.source
          ),
          lookbehind: true,
          alias: "static",
          inside: {
            namespace: className.inside.namespace,
            static: /\b\w+$/,
            punctuation: /\./,
            operator: /\*/,
            "class-name": /\w+/
          }
        }
      ],
      namespace: {
        pattern: RegExp(
          /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(
            /<keyword>/g,
            function() {
              return keywords.source;
            }
          )
        ),
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      }
    });
  })(Prism2);
}

// node_modules/refractor/lang/regex.js
regex2.displayName = "regex";
regex2.aliases = [];
function regex2(Prism2) {
  ;
  (function(Prism3) {
    var specialEscape = {
      pattern: /\\[\\(){}[\]^$+*?|.]/,
      alias: "escape"
    };
    var escape2 = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/;
    var charSet = {
      pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
      alias: "class-name"
    };
    var charSetWithoutDot = {
      pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
      alias: "class-name"
    };
    var rangeChar = "(?:[^\\\\-]|" + escape2.source + ")";
    var range = RegExp(rangeChar + "-" + rangeChar);
    var groupName = {
      pattern: /(<|')[^<>']+(?=[>']$)/,
      lookbehind: true,
      alias: "variable"
    };
    Prism3.languages.regex = {
      "char-class": {
        pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
        lookbehind: true,
        inside: {
          "char-class-negation": {
            pattern: /(^\[)\^/,
            lookbehind: true,
            alias: "operator"
          },
          "char-class-punctuation": {
            pattern: /^\[|\]$/,
            alias: "punctuation"
          },
          range: {
            pattern: range,
            inside: {
              escape: escape2,
              "range-punctuation": {
                pattern: /-/,
                alias: "operator"
              }
            }
          },
          "special-escape": specialEscape,
          "char-set": charSetWithoutDot,
          escape: escape2
        }
      },
      "special-escape": specialEscape,
      "char-set": charSet,
      backreference: [
        {
          pattern: /\\(?![123][0-7]{2})[1-9]/,
          alias: "keyword"
        },
        {
          pattern: /\\k<[^<>']+>/,
          alias: "keyword",
          inside: {
            "group-name": groupName
          }
        }
      ],
      anchor: {
        pattern: /[$^]|\\[ABbGZz]/,
        alias: "function"
      },
      escape: escape2,
      group: [
        {
          pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
          alias: "punctuation",
          inside: {
            "group-name": groupName
          }
        },
        {
          pattern: /\)/,
          alias: "punctuation"
        }
      ],
      quantifier: {
        pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
        alias: "number"
      },
      alternation: {
        pattern: /\|/,
        alias: "keyword"
      }
    };
  })(Prism2);
}

// node_modules/refractor/lang/javascript.js
javascript.displayName = "javascript";
javascript.aliases = ["js"];
function javascript(Prism2) {
  Prism2.register(clike);
  Prism2.languages.javascript = Prism2.languages.extend("clike", {
    "class-name": [
      Prism2.languages.clike["class-name"],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: true
      }
    ],
    keyword: [
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: true
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: true
      }
    ],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
      pattern: RegExp(
        /(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
      ),
      lookbehind: true
    },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  });
  Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
  Prism2.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: RegExp(
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: true,
          alias: "language-regex",
          inside: Prism2.languages.regex
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/
      }
    },
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function"
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  });
  Prism2.languages.insertBefore("javascript", "string", {
    hashbang: {
      pattern: /^#!.*/,
      greedy: true,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: Prism2.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    },
    "string-property": {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: true,
      greedy: true,
      alias: "property"
    }
  });
  Prism2.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: true,
      alias: "property"
    }
  });
  if (Prism2.languages.markup) {
    Prism2.languages.markup.tag.addInlined("script", "javascript");
    Prism2.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    );
  }
  Prism2.languages.js = Prism2.languages.javascript;
}

// node_modules/refractor/lang/json.js
json.displayName = "json";
json.aliases = ["webmanifest"];
function json(Prism2) {
  Prism2.languages.json = {
    property: {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
      lookbehind: true,
      greedy: true
    },
    string: {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      lookbehind: true,
      greedy: true
    },
    comment: {
      pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: true
    },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:false|true)\b/,
    null: {
      pattern: /\bnull\b/,
      alias: "keyword"
    }
  };
  Prism2.languages.webmanifest = Prism2.languages.json;
}

// node_modules/refractor/lang/kotlin.js
kotlin.displayName = "kotlin";
kotlin.aliases = ["kt", "kts"];
function kotlin(Prism2) {
  Prism2.register(clike);
  (function(Prism3) {
    Prism3.languages.kotlin = Prism3.languages.extend("clike", {
      keyword: {
        pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
        lookbehind: true
      },
      function: [
        {
          pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/,
          greedy: true
        },
        {
          pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
          lookbehind: true,
          greedy: true
        }
      ],
      number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
      operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
    });
    delete Prism3.languages.kotlin["class-name"];
    var interpolationInside = {
      "interpolation-punctuation": {
        pattern: /^\$\{?|\}$/,
        alias: "punctuation"
      },
      expression: {
        pattern: /[\s\S]+/,
        inside: Prism3.languages.kotlin
      }
    };
    Prism3.languages.insertBefore("kotlin", "string", {
      "string-literal": [
        {
          pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
          alias: "multiline",
          inside: {
            interpolation: {
              pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i,
              inside: interpolationInside
            },
            string: /[\s\S]+/
          }
        },
        {
          pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/,
          alias: "singleline",
          inside: {
            interpolation: {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i,
              lookbehind: true,
              inside: interpolationInside
            },
            string: /[\s\S]+/
          }
        }
      ],
      char: {
        pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/,
        greedy: true
      }
    });
    delete Prism3.languages.kotlin["string"];
    Prism3.languages.insertBefore("kotlin", "keyword", {
      annotation: {
        pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
        alias: "builtin"
      }
    });
    Prism3.languages.insertBefore("kotlin", "function", {
      label: {
        pattern: /\b\w+@|@\w+\b/,
        alias: "symbol"
      }
    });
    Prism3.languages.kt = Prism3.languages.kotlin;
    Prism3.languages.kts = Prism3.languages.kotlin;
  })(Prism2);
}

// node_modules/refractor/lang/less.js
less.displayName = "less";
less.aliases = [];
function less(Prism2) {
  Prism2.register(css);
  Prism2.languages.less = Prism2.languages.extend("css", {
    comment: [
      /\/\*[\s\S]*?\*\//,
      {
        pattern: /(^|[^\\])\/\/.*/,
        lookbehind: true
      }
    ],
    atrule: {
      pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
      inside: {
        punctuation: /[:()]/
      }
    },
    selector: {
      pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
      inside: {
        variable: /@+[\w-]+/
      }
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
    operator: /[+\-*\/]/
  });
  Prism2.languages.insertBefore("less", "property", {
    variable: [
      {
        pattern: /@[\w-]+\s*:/,
        inside: {
          punctuation: /:/
        }
      },
      /@@?[\w-]+/
    ],
    "mixin-usage": {
      pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
      lookbehind: true,
      alias: "function"
    }
  });
}

// node_modules/refractor/lang/lua.js
lua.displayName = "lua";
lua.aliases = [];
function lua(Prism2) {
  Prism2.languages.lua = {
    comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
    string: {
      pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
      greedy: true
    },
    number: /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
    function: /(?!\d)\w+(?=\s*(?:[({]))/,
    operator: [
      /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
      {
        pattern: /(^|[^.])\.\.(?!\.)/,
        lookbehind: true
      }
    ],
    punctuation: /[\[\](){},;]|\.+|:+/
  };
}

// node_modules/refractor/lang/makefile.js
makefile.displayName = "makefile";
makefile.aliases = [];
function makefile(Prism2) {
  Prism2.languages.makefile = {
    comment: {
      pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
      lookbehind: true
    },
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "builtin-target": {
      pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
      alias: "builtin"
    },
    target: {
      pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
      alias: "symbol",
      inside: {
        variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
      }
    },
    variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
    keyword: /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
    function: {
      pattern: /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
      lookbehind: true
    },
    operator: /(?:::|[?:+!])?=|[|@]/,
    punctuation: /[:;(){}]/
  };
}

// node_modules/refractor/lang/yaml.js
yaml.displayName = "yaml";
yaml.aliases = ["yml"];
function yaml(Prism2) {
  ;
  (function(Prism3) {
    var anchorOrAlias = /[*&][^\s[\]{},]+/;
    var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
    var properties = "(?:" + tag.source + "(?:[ 	]+" + anchorOrAlias.source + ")?|" + anchorOrAlias.source + "(?:[ 	]+" + tag.source + ")?)";
    var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(
      /<PLAIN>/g,
      function() {
        return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
      }
    );
    var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
    function createValuePattern(value2, flags) {
      flags = (flags || "").replace(/m/g, "") + "m";
      var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
        return properties;
      }).replace(/<<value>>/g, function() {
        return value2;
      });
      return RegExp(pattern, flags);
    }
    Prism3.languages.yaml = {
      scalar: {
        pattern: RegExp(
          /([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
            /<<prop>>/g,
            function() {
              return properties;
            }
          )
        ),
        lookbehind: true,
        alias: "string"
      },
      comment: /#.*/,
      key: {
        pattern: RegExp(
          /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
            return properties;
          }).replace(/<<key>>/g, function() {
            return "(?:" + plainKey + "|" + string + ")";
          })
        ),
        lookbehind: true,
        greedy: true,
        alias: "atrule"
      },
      directive: {
        pattern: /(^[ \t]*)%.+/m,
        lookbehind: true,
        alias: "important"
      },
      datetime: {
        pattern: createValuePattern(
          /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source
        ),
        lookbehind: true,
        alias: "number"
      },
      boolean: {
        pattern: createValuePattern(/false|true/.source, "i"),
        lookbehind: true,
        alias: "important"
      },
      null: {
        pattern: createValuePattern(/null|~/.source, "i"),
        lookbehind: true,
        alias: "important"
      },
      string: {
        pattern: createValuePattern(string),
        lookbehind: true,
        greedy: true
      },
      number: {
        pattern: createValuePattern(
          /[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,
          "i"
        ),
        lookbehind: true
      },
      tag,
      important: anchorOrAlias,
      punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
    };
    Prism3.languages.yml = Prism3.languages.yaml;
  })(Prism2);
}

// node_modules/refractor/lang/markdown.js
markdown.displayName = "markdown";
markdown.aliases = ["md"];
function markdown(Prism2) {
  Prism2.register(markup);
  (function(Prism3) {
    var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
    function createInline(pattern) {
      pattern = pattern.replace(/<inner>/g, function() {
        return inner;
      });
      return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + pattern + ")");
    }
    var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
    var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(
      /__/g,
      function() {
        return tableCell;
      }
    );
    var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
    Prism3.languages.markdown = Prism3.languages.extend("markup", {});
    Prism3.languages.insertBefore("markdown", "prolog", {
      "front-matter-block": {
        pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
        lookbehind: true,
        greedy: true,
        inside: {
          punctuation: /^---|---$/,
          "front-matter": {
            pattern: /\S+(?:\s+\S+)*/,
            alias: ["yaml", "language-yaml"],
            inside: Prism3.languages.yaml
          }
        }
      },
      blockquote: {
        pattern: /^>(?:[\t ]*>)*/m,
        alias: "punctuation"
      },
      table: {
        pattern: RegExp(
          "^" + tableRow + tableLine + "(?:" + tableRow + ")*",
          "m"
        ),
        inside: {
          "table-data-rows": {
            pattern: RegExp(
              "^(" + tableRow + tableLine + ")(?:" + tableRow + ")*$"
            ),
            lookbehind: true,
            inside: {
              "table-data": {
                pattern: RegExp(tableCell),
                inside: Prism3.languages.markdown
              },
              punctuation: /\|/
            }
          },
          "table-line": {
            pattern: RegExp("^(" + tableRow + ")" + tableLine + "$"),
            lookbehind: true,
            inside: {
              punctuation: /\||:?-{3,}:?/
            }
          },
          "table-header-row": {
            pattern: RegExp("^" + tableRow + "$"),
            inside: {
              "table-header": {
                pattern: RegExp(tableCell),
                alias: "important",
                inside: Prism3.languages.markdown
              },
              punctuation: /\|/
            }
          }
        }
      },
      code: [
        {
          pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
          lookbehind: true,
          alias: "keyword"
        },
        {
          pattern: /^```[\s\S]*?^```$/m,
          greedy: true,
          inside: {
            "code-block": {
              pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
              lookbehind: true
            },
            "code-language": {
              pattern: /^(```).+/,
              lookbehind: true
            },
            punctuation: /```/
          }
        }
      ],
      title: [
        {
          pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
          alias: "important",
          inside: {
            punctuation: /==+$|--+$/
          }
        },
        {
          pattern: /(^\s*)#.+/m,
          lookbehind: true,
          alias: "important",
          inside: {
            punctuation: /^#+|#+$/
          }
        }
      ],
      hr: {
        pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: true,
        alias: "punctuation"
      },
      list: {
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: true,
        alias: "punctuation"
      },
      "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
          variable: {
            pattern: /^(!?\[)[^\]]+/,
            lookbehind: true
          },
          string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
          punctuation: /^[\[\]!:]|[<>]/
        },
        alias: "url"
      },
      bold: {
        pattern: createInline(
          /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          content: {
            pattern: /(^..)[\s\S]+(?=..$)/,
            lookbehind: true,
            inside: {}
          },
          punctuation: /\*\*|__/
        }
      },
      italic: {
        pattern: createInline(
          /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          content: {
            pattern: /(^.)[\s\S]+(?=.$)/,
            lookbehind: true,
            inside: {}
          },
          punctuation: /[*_]/
        }
      },
      strike: {
        pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
        lookbehind: true,
        greedy: true,
        inside: {
          content: {
            pattern: /(^~~?)[\s\S]+(?=\1$)/,
            lookbehind: true,
            inside: {}
          },
          punctuation: /~~?/
        }
      },
      "code-snippet": {
        pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
        lookbehind: true,
        greedy: true,
        alias: ["code", "keyword"]
      },
      url: {
        pattern: createInline(
          /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          operator: /^!/,
          content: {
            pattern: /(^\[)[^\]]+(?=\])/,
            lookbehind: true,
            inside: {}
          },
          variable: {
            pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
            lookbehind: true
          },
          url: {
            pattern: /(^\]\()[^\s)]+/,
            lookbehind: true
          },
          string: {
            pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
            lookbehind: true
          }
        }
      }
    });
    ["url", "bold", "italic", "strike"].forEach(function(token) {
      ;
      ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(inside) {
        if (token !== inside) {
          Prism3.languages.markdown[token].inside.content.inside[inside] = Prism3.languages.markdown[inside];
        }
      });
    });
    Prism3.hooks.add("after-tokenize", function(env) {
      if (env.language !== "markdown" && env.language !== "md") {
        return;
      }
      function walkTokens2(tokens) {
        if (!tokens || typeof tokens === "string") {
          return;
        }
        for (var i2 = 0, l = tokens.length; i2 < l; i2++) {
          var token = tokens[i2];
          if (token.type !== "code") {
            walkTokens2(token.content);
            continue;
          }
          var codeLang = token.content[1];
          var codeBlock = token.content[3];
          if (codeLang && codeBlock && codeLang.type === "code-language" && codeBlock.type === "code-block" && typeof codeLang.content === "string") {
            var lang = codeLang.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            lang = (/[a-z][\w-]*/i.exec(lang) || [""])[0].toLowerCase();
            var alias2 = "language-" + lang;
            if (!codeBlock.alias) {
              codeBlock.alias = [alias2];
            } else if (typeof codeBlock.alias === "string") {
              codeBlock.alias = [codeBlock.alias, alias2];
            } else {
              codeBlock.alias.push(alias2);
            }
          }
        }
      }
      walkTokens2(env.tokens);
    });
    Prism3.hooks.add("wrap", function(env) {
      if (env.type !== "code-block") {
        return;
      }
      var codeLang = "";
      for (var i2 = 0, l = env.classes.length; i2 < l; i2++) {
        var cls = env.classes[i2];
        var match = /language-(.+)/.exec(cls);
        if (match) {
          codeLang = match[1];
          break;
        }
      }
      var grammar = Prism3.languages[codeLang];
      if (!grammar) {
        if (codeLang && codeLang !== "none" && Prism3.plugins.autoloader) {
          var id = "md-" + new Date().valueOf() + "-" + Math.floor(Math.random() * 1e16);
          env.attributes["id"] = id;
          Prism3.plugins.autoloader.loadLanguages(codeLang, function() {
            var ele = document.getElementById(id);
            if (ele) {
              ele.innerHTML = Prism3.highlight(
                ele.textContent,
                Prism3.languages[codeLang],
                codeLang
              );
            }
          });
        }
      } else {
        env.content = Prism3.highlight(
          textContent(env.content.value),
          grammar,
          codeLang
        );
      }
    });
    var tagPattern = RegExp(Prism3.languages.markup.tag.pattern.source, "gi");
    var KNOWN_ENTITY_NAMES = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: '"'
    };
    var fromCodePoint = String.fromCodePoint || String.fromCharCode;
    function textContent(html3) {
      var text2 = html3.replace(tagPattern, "");
      text2 = text2.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(m2, code2) {
        code2 = code2.toLowerCase();
        if (code2[0] === "#") {
          var value2;
          if (code2[1] === "x") {
            value2 = parseInt(code2.slice(2), 16);
          } else {
            value2 = Number(code2.slice(1));
          }
          return fromCodePoint(value2);
        } else {
          var known = KNOWN_ENTITY_NAMES[code2];
          if (known) {
            return known;
          }
          return m2;
        }
      });
      return text2;
    }
    Prism3.languages.md = Prism3.languages.markdown;
  })(Prism2);
}

// node_modules/refractor/lang/objectivec.js
objectivec.displayName = "objectivec";
objectivec.aliases = ["objc"];
function objectivec(Prism2) {
  Prism2.register(c);
  Prism2.languages.objectivec = Prism2.languages.extend("c", {
    string: {
      pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
      greedy: true
    },
    keyword: /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
  });
  delete Prism2.languages.objectivec["class-name"];
  Prism2.languages.objc = Prism2.languages.objectivec;
}

// node_modules/refractor/lang/perl.js
perl.displayName = "perl";
perl.aliases = [];
function perl(Prism2) {
  ;
  (function(Prism3) {
    var brackets = /(?:\((?:[^()\\]|\\[\s\S])*\)|\{(?:[^{}\\]|\\[\s\S])*\}|\[(?:[^[\]\\]|\\[\s\S])*\]|<(?:[^<>\\]|\\[\s\S])*>)/.source;
    Prism3.languages.perl = {
      comment: [
        {
          pattern: /(^\s*)=\w[\s\S]*?=cut.*/m,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\$])#.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: [
        {
          pattern: RegExp(
            /\b(?:q|qq|qw|qx)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
              /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
              /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
              brackets
            ].join("|") + ")"
          ),
          greedy: true
        },
        {
          pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,
          greedy: true
        },
        {
          pattern: /'(?:[^'\\\r\n]|\\.)*'/,
          greedy: true
        }
      ],
      regex: [
        {
          pattern: RegExp(
            /\b(?:m|qr)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
              /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
              /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
              brackets
            ].join("|") + ")" + /[msixpodualngc]*/.source
          ),
          greedy: true
        },
        {
          pattern: RegExp(
            /(^|[^-])\b(?:s|tr|y)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
              /([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
              /([a-zA-Z0-9])(?:(?!\3)[^\\]|\\[\s\S])*\3(?:(?!\3)[^\\]|\\[\s\S])*\3/.source,
              brackets + /\s*/.source + brackets
            ].join("|") + ")" + /[msixpodualngcer]*/.source
          ),
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|x|xor)\b))/,
          greedy: true
        }
      ],
      variable: [
        /[&*$@%]\{\^[A-Z]+\}/,
        /[&*$@%]\^[A-Z_]/,
        /[&*$@%]#?(?=\{)/,
        /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+(?![\w$]))+(?:::)*/,
        /[&*$@%]\d+/,
        /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/
      ],
      filehandle: {
        pattern: /<(?![<=])\S*?>|\b_\b/,
        alias: "symbol"
      },
      "v-string": {
        pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
        alias: "string"
      },
      function: {
        pattern: /(\bsub[ \t]+)\w+/,
        lookbehind: true
      },
      keyword: /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
      number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
      operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)\b/,
      punctuation: /[{}[\];(),:]/
    };
  })(Prism2);
}

// node_modules/refractor/lang/markup-templating.js
markupTemplating.displayName = "markup-templating";
markupTemplating.aliases = [];
function markupTemplating(Prism2) {
  Prism2.register(markup);
  (function(Prism3) {
    function getPlaceholder(language, index) {
      return "___" + language.toUpperCase() + index + "___";
    }
    Object.defineProperties(Prism3.languages["markup-templating"] = {}, {
      buildPlaceholders: {
        value: function(env, language, placeholderPattern, replaceFilter) {
          if (env.language !== language) {
            return;
          }
          var tokenStack = env.tokenStack = [];
          env.code = env.code.replace(placeholderPattern, function(match) {
            if (typeof replaceFilter === "function" && !replaceFilter(match)) {
              return match;
            }
            var i2 = tokenStack.length;
            var placeholder;
            while (env.code.indexOf(placeholder = getPlaceholder(language, i2)) !== -1) {
              ++i2;
            }
            tokenStack[i2] = match;
            return placeholder;
          });
          env.grammar = Prism3.languages.markup;
        }
      },
      tokenizePlaceholders: {
        value: function(env, language) {
          if (env.language !== language || !env.tokenStack) {
            return;
          }
          env.grammar = Prism3.languages[language];
          var j = 0;
          var keys = Object.keys(env.tokenStack);
          function walkTokens2(tokens) {
            for (var i2 = 0; i2 < tokens.length; i2++) {
              if (j >= keys.length) {
                break;
              }
              var token = tokens[i2];
              if (typeof token === "string" || token.content && typeof token.content === "string") {
                var k = keys[j];
                var t2 = env.tokenStack[k];
                var s3 = typeof token === "string" ? token : token.content;
                var placeholder = getPlaceholder(language, k);
                var index = s3.indexOf(placeholder);
                if (index > -1) {
                  ++j;
                  var before = s3.substring(0, index);
                  var middle = new Prism3.Token(
                    language,
                    Prism3.tokenize(t2, env.grammar),
                    "language-" + language,
                    t2
                  );
                  var after = s3.substring(index + placeholder.length);
                  var replacement = [];
                  if (before) {
                    replacement.push.apply(replacement, walkTokens2([before]));
                  }
                  replacement.push(middle);
                  if (after) {
                    replacement.push.apply(replacement, walkTokens2([after]));
                  }
                  if (typeof token === "string") {
                    tokens.splice.apply(tokens, [i2, 1].concat(replacement));
                  } else {
                    token.content = replacement;
                  }
                }
              } else if (token.content) {
                walkTokens2(token.content);
              }
            }
            return tokens;
          }
          walkTokens2(env.tokens);
        }
      }
    });
  })(Prism2);
}

// node_modules/refractor/lang/php.js
php.displayName = "php";
php.aliases = [];
function php(Prism2) {
  Prism2.register(markupTemplating);
  (function(Prism3) {
    var comment = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/;
    var constant = [
      {
        pattern: /\b(?:false|true)\b/i,
        alias: "boolean"
      },
      {
        pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
        greedy: true,
        lookbehind: true
      },
      /\b(?:null)\b/i,
      /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/
    ];
    var number2 = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
    var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/;
    var punctuation2 = /[{}\[\](),:;]/;
    Prism3.languages.php = {
      delimiter: {
        pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
        alias: "important"
      },
      comment,
      variable: /\$+(?:\w+\b|(?=\{))/,
      package: {
        pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        lookbehind: true,
        inside: {
          punctuation: /\\/
        }
      },
      "class-name-definition": {
        pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
        lookbehind: true,
        alias: "class-name"
      },
      "function-definition": {
        pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
        lookbehind: true,
        alias: "function"
      },
      keyword: [
        {
          pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
          alias: "type-casting",
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
          alias: "type-hint",
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
          alias: "return-type",
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
          alias: "type-declaration",
          greedy: true
        },
        {
          pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
          alias: "type-declaration",
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /\b(?:parent|self|static)(?=\s*::)/i,
          alias: "static-context",
          greedy: true
        },
        {
          pattern: /(\byield\s+)from\b/i,
          lookbehind: true
        },
        /\bclass\b/i,
        {
          pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
          lookbehind: true
        }
      ],
      "argument-name": {
        pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
        lookbehind: true
      },
      "class-name": [
        {
          pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
          greedy: true
        },
        {
          pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
          alias: "class-name-fully-qualified",
          greedy: true,
          lookbehind: true,
          inside: {
            punctuation: /\\/
          }
        },
        {
          pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
          alias: "class-name-fully-qualified",
          greedy: true,
          inside: {
            punctuation: /\\/
          }
        },
        {
          pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
          alias: "class-name-fully-qualified",
          greedy: true,
          lookbehind: true,
          inside: {
            punctuation: /\\/
          }
        },
        {
          pattern: /\b[a-z_]\w*(?=\s*\$)/i,
          alias: "type-declaration",
          greedy: true
        },
        {
          pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
          alias: ["class-name-fully-qualified", "type-declaration"],
          greedy: true,
          inside: {
            punctuation: /\\/
          }
        },
        {
          pattern: /\b[a-z_]\w*(?=\s*::)/i,
          alias: "static-context",
          greedy: true
        },
        {
          pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
          alias: ["class-name-fully-qualified", "static-context"],
          greedy: true,
          inside: {
            punctuation: /\\/
          }
        },
        {
          pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
          alias: "type-hint",
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
          alias: ["class-name-fully-qualified", "type-hint"],
          greedy: true,
          lookbehind: true,
          inside: {
            punctuation: /\\/
          }
        },
        {
          pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
          alias: "return-type",
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
          alias: ["class-name-fully-qualified", "return-type"],
          greedy: true,
          lookbehind: true,
          inside: {
            punctuation: /\\/
          }
        }
      ],
      constant,
      function: {
        pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
        lookbehind: true,
        inside: {
          punctuation: /\\/
        }
      },
      property: {
        pattern: /(->\s*)\w+/,
        lookbehind: true
      },
      number: number2,
      operator,
      punctuation: punctuation2
    };
    var string_interpolation = {
      pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
      lookbehind: true,
      inside: Prism3.languages.php
    };
    var string = [
      {
        pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
        alias: "nowdoc-string",
        greedy: true,
        inside: {
          delimiter: {
            pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: {
              punctuation: /^<<<'?|[';]$/
            }
          }
        }
      },
      {
        pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
        alias: "heredoc-string",
        greedy: true,
        inside: {
          delimiter: {
            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: {
              punctuation: /^<<<"?|[";]$/
            }
          },
          interpolation: string_interpolation
        }
      },
      {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        alias: "backtick-quoted-string",
        greedy: true
      },
      {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        alias: "single-quoted-string",
        greedy: true
      },
      {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        alias: "double-quoted-string",
        greedy: true,
        inside: {
          interpolation: string_interpolation
        }
      }
    ];
    Prism3.languages.insertBefore("php", "variable", {
      string,
      attribute: {
        pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
        greedy: true,
        inside: {
          "attribute-content": {
            pattern: /^(#\[)[\s\S]+(?=\]$)/,
            lookbehind: true,
            inside: {
              comment,
              string,
              "attribute-class-name": [
                {
                  pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                  alias: "class-name",
                  greedy: true,
                  lookbehind: true
                },
                {
                  pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                  alias: ["class-name", "class-name-fully-qualified"],
                  greedy: true,
                  lookbehind: true,
                  inside: {
                    punctuation: /\\/
                  }
                }
              ],
              constant,
              number: number2,
              operator,
              punctuation: punctuation2
            }
          },
          delimiter: {
            pattern: /^#\[|\]$/,
            alias: "punctuation"
          }
        }
      }
    });
    Prism3.hooks.add("before-tokenize", function(env) {
      if (!/<\?/.test(env.code)) {
        return;
      }
      var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g;
      Prism3.languages["markup-templating"].buildPlaceholders(
        env,
        "php",
        phpPattern
      );
    });
    Prism3.hooks.add("after-tokenize", function(env) {
      Prism3.languages["markup-templating"].tokenizePlaceholders(env, "php");
    });
  })(Prism2);
}

// node_modules/refractor/lang/python.js
python.displayName = "python";
python.aliases = ["py"];
function python(Prism2) {
  Prism2.languages.python = {
    comment: {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true,
      greedy: true
    },
    "string-interpolation": {
      pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
      greedy: true,
      inside: {
        interpolation: {
          pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
          lookbehind: true,
          inside: {
            "format-spec": {
              pattern: /(:)[^:(){}]+(?=\}$)/,
              lookbehind: true
            },
            "conversion-option": {
              pattern: /![sra](?=[:}]$)/,
              alias: "punctuation"
            },
            rest: null
          }
        },
        string: /[\s\S]+/
      }
    },
    "triple-quoted-string": {
      pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
      greedy: true,
      alias: "string"
    },
    string: {
      pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
      greedy: true
    },
    function: {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: true
    },
    "class-name": {
      pattern: /(\bclass\s+)\w+/i,
      lookbehind: true
    },
    decorator: {
      pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
      lookbehind: true,
      alias: ["annotation", "punctuation"],
      inside: {
        punctuation: /\./
      }
    },
    keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:False|None|True)\b/,
    number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/
  };
  Prism2.languages.python["string-interpolation"].inside["interpolation"].inside.rest = Prism2.languages.python;
  Prism2.languages.py = Prism2.languages.python;
}

// node_modules/refractor/lang/r.js
r.displayName = "r";
r.aliases = [];
function r(Prism2) {
  Prism2.languages.r = {
    comment: /#.*/,
    string: {
      pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "percent-operator": {
      pattern: /%[^%\s]*%/,
      alias: "operator"
    },
    boolean: /\b(?:FALSE|TRUE)\b/,
    ellipsis: /\.\.(?:\.|\d+)/,
    number: [
      /\b(?:Inf|NaN)\b/,
      /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/
    ],
    keyword: /\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,
    operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
    punctuation: /[(){}\[\],;]/
  };
}

// node_modules/refractor/lang/ruby.js
ruby.displayName = "ruby";
ruby.aliases = ["rb"];
function ruby(Prism2) {
  Prism2.register(clike);
  (function(Prism3) {
    Prism3.languages.ruby = Prism3.languages.extend("clike", {
      comment: {
        pattern: /#.*|^=begin\s[\s\S]*?^=end/m,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
        lookbehind: true,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
      operator: /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
      punctuation: /[(){}[\].,;]/
    });
    Prism3.languages.insertBefore("ruby", "operator", {
      "double-colon": {
        pattern: /::/,
        alias: "punctuation"
      }
    });
    var interpolation = {
      pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
      lookbehind: true,
      inside: {
        content: {
          pattern: /^(#\{)[\s\S]+(?=\}$)/,
          lookbehind: true,
          inside: Prism3.languages.ruby
        },
        delimiter: {
          pattern: /^#\{|\}$/,
          alias: "punctuation"
        }
      }
    };
    delete Prism3.languages.ruby.function;
    var percentExpression = "(?:" + [
      /([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
      /\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,
      /\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,
      /\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,
      /<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source
    ].join("|") + ")";
    var symbolName = /(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;
    Prism3.languages.insertBefore("ruby", "keyword", {
      "regex-literal": [
        {
          pattern: RegExp(
            /%r/.source + percentExpression + /[egimnosux]{0,6}/.source
          ),
          greedy: true,
          inside: {
            interpolation,
            regex: /[\s\S]+/
          }
        },
        {
          pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
          lookbehind: true,
          greedy: true,
          inside: {
            interpolation,
            regex: /[\s\S]+/
          }
        }
      ],
      variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
      symbol: [
        {
          pattern: RegExp(/(^|[^:]):/.source + symbolName),
          lookbehind: true,
          greedy: true
        },
        {
          pattern: RegExp(
            /([\r\n{(,][ \t]*)/.source + symbolName + /(?=:(?!:))/.source
          ),
          lookbehind: true,
          greedy: true
        }
      ],
      "method-definition": {
        pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
        lookbehind: true,
        inside: {
          function: /\b\w+$/,
          keyword: /^self\b/,
          "class-name": /^\w+/,
          punctuation: /\./
        }
      }
    });
    Prism3.languages.insertBefore("ruby", "string", {
      "string-literal": [
        {
          pattern: RegExp(/%[qQiIwWs]?/.source + percentExpression),
          greedy: true,
          inside: {
            interpolation,
            string: /[\s\S]+/
          }
        },
        {
          pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
          greedy: true,
          inside: {
            interpolation,
            string: /[\s\S]+/
          }
        },
        {
          pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: "heredoc-string",
          greedy: true,
          inside: {
            delimiter: {
              pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
              inside: {
                symbol: /\b\w+/,
                punctuation: /^<<[-~]?/
              }
            },
            interpolation,
            string: /[\s\S]+/
          }
        },
        {
          pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: "heredoc-string",
          greedy: true,
          inside: {
            delimiter: {
              pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
              inside: {
                symbol: /\b\w+/,
                punctuation: /^<<[-~]?'|'$/
              }
            },
            string: /[\s\S]+/
          }
        }
      ],
      "command-literal": [
        {
          pattern: RegExp(/%x/.source + percentExpression),
          greedy: true,
          inside: {
            interpolation,
            command: {
              pattern: /[\s\S]+/,
              alias: "string"
            }
          }
        },
        {
          pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
          greedy: true,
          inside: {
            interpolation,
            command: {
              pattern: /[\s\S]+/,
              alias: "string"
            }
          }
        }
      ]
    });
    delete Prism3.languages.ruby.string;
    Prism3.languages.insertBefore("ruby", "number", {
      builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
      constant: /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/
    });
    Prism3.languages.rb = Prism3.languages.ruby;
  })(Prism2);
}

// node_modules/refractor/lang/rust.js
rust.displayName = "rust";
rust.aliases = [];
function rust(Prism2) {
  ;
  (function(Prism3) {
    var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
    for (var i2 = 0; i2 < 2; i2++) {
      multilineComment = multilineComment.replace(/<self>/g, function() {
        return multilineComment;
      });
    }
    multilineComment = multilineComment.replace(/<self>/g, function() {
      return /[^\s\S]/.source;
    });
    Prism3.languages.rust = {
      comment: [
        {
          pattern: RegExp(/(^|[^\\])/.source + multilineComment),
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: {
        pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
        greedy: true
      },
      char: {
        pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
        greedy: true
      },
      attribute: {
        pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
        greedy: true,
        alias: "attr-name",
        inside: {
          string: null
        }
      },
      "closure-params": {
        pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
        lookbehind: true,
        greedy: true,
        inside: {
          "closure-punctuation": {
            pattern: /^\||\|$/,
            alias: "punctuation"
          },
          rest: null
        }
      },
      "lifetime-annotation": {
        pattern: /'\w+/,
        alias: "symbol"
      },
      "fragment-specifier": {
        pattern: /(\$\w+:)[a-z]+/,
        lookbehind: true,
        alias: "punctuation"
      },
      variable: /\$\w+/,
      "function-definition": {
        pattern: /(\bfn\s+)\w+/,
        lookbehind: true,
        alias: "function"
      },
      "type-definition": {
        pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
        lookbehind: true,
        alias: "class-name"
      },
      "module-declaration": [
        {
          pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
          lookbehind: true,
          alias: "namespace"
        },
        {
          pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
          lookbehind: true,
          alias: "namespace",
          inside: {
            punctuation: /::/
          }
        }
      ],
      keyword: [
        /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
        /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
      ],
      function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
      macro: {
        pattern: /\b\w+!/,
        alias: "property"
      },
      constant: /\b[A-Z_][A-Z_\d]+\b/,
      "class-name": /\b[A-Z]\w*\b/,
      namespace: {
        pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
        inside: {
          punctuation: /::/
        }
      },
      number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
      boolean: /\b(?:false|true)\b/,
      punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
      operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
    };
    Prism3.languages.rust["closure-params"].inside.rest = Prism3.languages.rust;
    Prism3.languages.rust["attribute"].inside["string"] = Prism3.languages.rust["string"];
  })(Prism2);
}

// node_modules/refractor/lang/sass.js
sass.displayName = "sass";
sass.aliases = [];
function sass(Prism2) {
  Prism2.register(css);
  (function(Prism3) {
    Prism3.languages.sass = Prism3.languages.extend("css", {
      comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
        lookbehind: true,
        greedy: true
      }
    });
    Prism3.languages.insertBefore("sass", "atrule", {
      "atrule-line": {
        pattern: /^(?:[ \t]*)[@+=].+/m,
        greedy: true,
        inside: {
          atrule: /(?:@[\w-]+|[+=])/
        }
      }
    });
    delete Prism3.languages.sass.atrule;
    var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
    var operator = [
      /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/,
      {
        pattern: /(\s)-(?=\s)/,
        lookbehind: true
      }
    ];
    Prism3.languages.insertBefore("sass", "property", {
      "variable-line": {
        pattern: /^[ \t]*\$.+/m,
        greedy: true,
        inside: {
          punctuation: /:/,
          variable,
          operator
        }
      },
      "property-line": {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
        greedy: true,
        inside: {
          property: [
            /[^:\s]+(?=\s*:)/,
            {
              pattern: /(:)[^:\s]+/,
              lookbehind: true
            }
          ],
          punctuation: /:/,
          variable,
          operator,
          important: Prism3.languages.sass.important
        }
      }
    });
    delete Prism3.languages.sass.property;
    delete Prism3.languages.sass.important;
    Prism3.languages.insertBefore("sass", "punctuation", {
      selector: {
        pattern: /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
        lookbehind: true,
        greedy: true
      }
    });
  })(Prism2);
}

// node_modules/refractor/lang/scss.js
scss.displayName = "scss";
scss.aliases = [];
function scss(Prism2) {
  Prism2.register(css);
  Prism2.languages.scss = Prism2.languages.extend("css", {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: true
    },
    atrule: {
      pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
      inside: {
        rule: /@[\w-]+/
      }
    },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
      pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
      inside: {
        parent: {
          pattern: /&/,
          alias: "important"
        },
        placeholder: /%[-\w]+/,
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
      }
    },
    property: {
      pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
      inside: {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
      }
    }
  });
  Prism2.languages.insertBefore("scss", "atrule", {
    keyword: [
      /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
      {
        pattern: /( )(?:from|through)(?= )/,
        lookbehind: true
      }
    ]
  });
  Prism2.languages.insertBefore("scss", "important", {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/
  });
  Prism2.languages.insertBefore("scss", "function", {
    "module-modifier": {
      pattern: /\b(?:as|hide|show|with)\b/i,
      alias: "keyword"
    },
    placeholder: {
      pattern: /%[-\w]+/,
      alias: "selector"
    },
    statement: {
      pattern: /\B!(?:default|optional)\b/i,
      alias: "keyword"
    },
    boolean: /\b(?:false|true)\b/,
    null: {
      pattern: /\bnull\b/,
      alias: "keyword"
    },
    operator: {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
      lookbehind: true
    }
  });
  Prism2.languages.scss["atrule"].inside.rest = Prism2.languages.scss;
}

// node_modules/refractor/lang/sql.js
sql.displayName = "sql";
sql.aliases = [];
function sql(Prism2) {
  Prism2.languages.sql = {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
      lookbehind: true
    },
    variable: [
      {
        pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
        greedy: true
      },
      /@[\w.$]+/
    ],
    string: {
      pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
      greedy: true,
      lookbehind: true
    },
    identifier: {
      pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
      greedy: true,
      lookbehind: true,
      inside: {
        punctuation: /^`|`$/
      }
    },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
  };
}

// node_modules/refractor/lang/swift.js
swift.displayName = "swift";
swift.aliases = [];
function swift(Prism2) {
  Prism2.languages.swift = {
    comment: {
      pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
      lookbehind: true,
      greedy: true
    },
    "string-literal": [
      {
        pattern: RegExp(
          /(^|[^"#])/.source + "(?:" + /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source + "|" + /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source + ")" + /(?!["#])/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
            lookbehind: true,
            inside: null
          },
          "interpolation-punctuation": {
            pattern: /^\)|\\\($/,
            alias: "punctuation"
          },
          punctuation: /\\(?=[\r\n])/,
          string: /[\s\S]+/
        }
      },
      {
        pattern: RegExp(
          /(^|[^"#])(#+)/.source + "(?:" + /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source + "|" + /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source + ")\\2"
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
            lookbehind: true,
            inside: null
          },
          "interpolation-punctuation": {
            pattern: /^\)|\\#+\($/,
            alias: "punctuation"
          },
          string: /[\s\S]+/
        }
      }
    ],
    directive: {
      pattern: RegExp(
        /#/.source + "(?:" + (/(?:elseif|if)\b/.source + "(?:[ 	]*" + /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source + ")+") + "|" + /(?:else|endif)\b/.source + ")"
      ),
      alias: "property",
      inside: {
        "directive-name": /^#\w+/,
        boolean: /\b(?:false|true)\b/,
        number: /\b\d+(?:\.\d+)*\b/,
        operator: /!|&&|\|\||[<>]=?/,
        punctuation: /[(),]/
      }
    },
    literal: {
      pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
      alias: "constant"
    },
    "other-directive": {
      pattern: /#\w+\b/,
      alias: "property"
    },
    attribute: {
      pattern: /@\w+/,
      alias: "atrule"
    },
    "function-definition": {
      pattern: /(\bfunc\s+)\w+/,
      lookbehind: true,
      alias: "function"
    },
    label: {
      pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
      lookbehind: true,
      alias: "important"
    },
    keyword: /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
    boolean: /\b(?:false|true)\b/,
    nil: {
      pattern: /\bnil\b/,
      alias: "constant"
    },
    "short-argument": /\$\d+\b/,
    omit: {
      pattern: /\b_\b/,
      alias: "keyword"
    },
    number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    "class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
    function: /\b[a-z_]\w*(?=\s*\()/i,
    constant: /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    operator: /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
    punctuation: /[{}[\]();,.:\\]/
  };
  Prism2.languages.swift["string-literal"].forEach(function(rule) {
    rule.inside["interpolation"].inside = Prism2.languages.swift;
  });
}

// node_modules/refractor/lang/typescript.js
typescript.displayName = "typescript";
typescript.aliases = ["ts"];
function typescript(Prism2) {
  Prism2.register(javascript);
  (function(Prism3) {
    Prism3.languages.typescript = Prism3.languages.extend("javascript", {
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
        lookbehind: true,
        greedy: true,
        inside: null
      },
      builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
    });
    Prism3.languages.typescript.keyword.push(
      /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
      /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
      /\btype\b(?=\s*(?:[\{*]|$))/
    );
    delete Prism3.languages.typescript["parameter"];
    delete Prism3.languages.typescript["literal-property"];
    var typeInside = Prism3.languages.extend("typescript", {});
    delete typeInside["class-name"];
    Prism3.languages.typescript["class-name"].inside = typeInside;
    Prism3.languages.insertBefore("typescript", "function", {
      decorator: {
        pattern: /@[$\w\xA0-\uFFFF]+/,
        inside: {
          at: {
            pattern: /^@/,
            alias: "operator"
          },
          function: /^[\s\S]+/
        }
      },
      "generic-function": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
        greedy: true,
        inside: {
          function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
          generic: {
            pattern: /<[\s\S]+/,
            alias: "class-name",
            inside: typeInside
          }
        }
      }
    });
    Prism3.languages.ts = Prism3.languages.typescript;
  })(Prism2);
}

// node_modules/refractor/lang/basic.js
basic.displayName = "basic";
basic.aliases = [];
function basic(Prism2) {
  Prism2.languages.basic = {
    comment: {
      pattern: /(?:!|REM\b).+/i,
      inside: {
        keyword: /^REM/i
      }
    },
    string: {
      pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^\w +\-.])*"/,
      greedy: true
    },
    number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i,
    keyword: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SELECT CASE|SHARED|SHELL|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
    function: /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
    operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
    punctuation: /[,;:()]/
  };
}

// node_modules/refractor/lang/vbnet.js
vbnet.displayName = "vbnet";
vbnet.aliases = [];
function vbnet(Prism2) {
  Prism2.register(basic);
  Prism2.languages.vbnet = Prism2.languages.extend("basic", {
    comment: [
      {
        pattern: /(?:!|REM\b).+/i,
        inside: {
          keyword: /^REM/i
        }
      },
      {
        pattern: /(^|[^\\:])'.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    string: {
      pattern: /(^|[^"])"(?:""|[^"])*"(?!")/,
      lookbehind: true,
      greedy: true
    },
    keyword: /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDBL|CDEC|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DEFAULT|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LET|LIB|LIKE|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPERATOR|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHELL|SHORT|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SWAP|SYNCLOCK|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
    punctuation: /[,;:(){}]/
  });
}

// node_modules/property-information/lib/util/schema.js
var Schema = class {
  constructor(property, normal, space) {
    this.property = property;
    this.normal = normal;
    if (space) {
      this.space = space;
    }
  }
};
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;

// node_modules/property-information/lib/util/merge.js
function merge(definitions, space) {
  const property = {};
  const normal = {};
  let index = -1;
  while (++index < definitions.length) {
    Object.assign(property, definitions[index].property);
    Object.assign(normal, definitions[index].normal);
  }
  return new Schema(property, normal, space);
}

// node_modules/property-information/lib/normalize.js
function normalize2(value2) {
  return value2.toLowerCase();
}

// node_modules/property-information/lib/util/info.js
var Info = class {
  constructor(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }
};
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;

// node_modules/property-information/lib/util/types.js
var types_exports = {};
__export(types_exports, {
  boolean: () => boolean,
  booleanish: () => booleanish,
  commaOrSpaceSeparated: () => commaOrSpaceSeparated,
  commaSeparated: () => commaSeparated,
  number: () => number,
  overloadedBoolean: () => overloadedBoolean,
  spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}

// node_modules/property-information/lib/util/defined-info.js
var checks = Object.keys(types_exports);
var DefinedInfo = class extends Info {
  constructor(property, attribute, mask, space) {
    let index = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index < checks.length) {
        const check = checks[index];
        mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
      }
    }
  }
};
DefinedInfo.prototype.defined = true;
function mark(values, key, value2) {
  if (value2) {
    values[key] = value2;
  }
}

// node_modules/property-information/lib/util/create.js
var own3 = {}.hasOwnProperty;
function create(definition) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition.properties) {
    if (own3.call(definition.properties, prop)) {
      const value2 = definition.properties[prop];
      const info = new DefinedInfo(
        prop,
        definition.transform(definition.attributes || {}, prop),
        value2,
        definition.space
      );
      if (definition.mustUseProperty && definition.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize2(prop)] = prop;
      normal[normalize2(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition.space);
}

// node_modules/property-information/lib/xlink.js
var xlink = create({
  space: "xlink",
  transform(_2, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});

// node_modules/property-information/lib/xml.js
var xml = create({
  space: "xml",
  transform(_2, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});

// node_modules/property-information/lib/util/case-sensitive-transform.js
function caseSensitiveTransform(attributes2, attribute) {
  return attribute in attributes2 ? attributes2[attribute] : attribute;
}

// node_modules/property-information/lib/util/case-insensitive-transform.js
function caseInsensitiveTransform(attributes2, property) {
  return caseSensitiveTransform(attributes2, property.toLowerCase());
}

// node_modules/property-information/lib/xmlns.js
var xmlns = create({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});

// node_modules/property-information/lib/aria.js
var aria = create({
  transform(_2, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});

// node_modules/property-information/lib/html.js
var html = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    align: null,
    aLink: null,
    archive: spaceSeparated,
    axis: null,
    background: null,
    bgColor: null,
    border: number,
    borderColor: null,
    bottomMargin: number,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: boolean,
    declare: boolean,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: number,
    leftMargin: number,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: number,
    marginWidth: number,
    noResize: boolean,
    noHref: boolean,
    noShade: boolean,
    noWrap: boolean,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: number,
    rules: null,
    scheme: null,
    scrolling: booleanish,
    standby: null,
    summary: null,
    text: null,
    topMargin: number,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: number,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});

// node_modules/property-information/lib/svg.js
var svg = create({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});

// node_modules/property-information/lib/find.js
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;
function find(schema, value2) {
  const normal = normalize2(value2);
  let prop = value2;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value2)) {
    if (value2.charAt(4) === "-") {
      const rest = value2.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value2.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value2 = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value2);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}

// node_modules/property-information/index.js
var html2 = merge([xml, xlink, xmlns, aria, html], "html");
var svg2 = merge([xml, xlink, xmlns, aria, svg], "svg");

// node_modules/hast-util-parse-selector/index.js
var search = /[#.]/g;
var parseSelector = function(selector, defaultTagName = "div") {
  var value2 = selector || "";
  var props = {};
  var start = 0;
  var subvalue;
  var previous2;
  var match;
  while (start < value2.length) {
    search.lastIndex = start;
    match = search.exec(value2);
    subvalue = value2.slice(start, match ? match.index : value2.length);
    if (subvalue) {
      if (!previous2) {
        defaultTagName = subvalue;
      } else if (previous2 === "#") {
        props.id = subvalue;
      } else if (Array.isArray(props.className)) {
        props.className.push(subvalue);
      } else {
        props.className = [subvalue];
      }
      start += subvalue.length;
    }
    if (match) {
      previous2 = match[0];
      start++;
    }
  }
  return {
    type: "element",
    tagName: defaultTagName,
    properties: props,
    children: []
  };
};

// node_modules/space-separated-tokens/index.js
function parse(value2) {
  const input = String(value2 || "").trim();
  return input ? input.split(/[ \t\n\r\f]+/g) : [];
}

// node_modules/comma-separated-tokens/index.js
function parse2(value2) {
  var tokens = [];
  var input = String(value2 || "");
  var index = input.indexOf(",");
  var start = 0;
  var end;
  var token;
  while (!end) {
    if (index === -1) {
      index = input.length;
      end = true;
    }
    token = input.slice(start, index).trim();
    if (token || !end) {
      tokens.push(token);
    }
    start = index + 1;
    index = input.indexOf(",", start);
  }
  return tokens;
}

// node_modules/hastscript/lib/core.js
var buttonTypes = /* @__PURE__ */ new Set(["menu", "submit", "reset", "button"]);
var own4 = {}.hasOwnProperty;
function core(schema, defaultTagName, caseSensitive) {
  const adjust = caseSensitive && createAdjustMap(caseSensitive);
  const h3 = function(selector, properties, ...children) {
    let index = -1;
    let node;
    if (selector === void 0 || selector === null) {
      node = { type: "root", children: [] };
      children.unshift(properties);
    } else {
      node = parseSelector(selector, defaultTagName);
      node.tagName = node.tagName.toLowerCase();
      if (adjust && own4.call(adjust, node.tagName)) {
        node.tagName = adjust[node.tagName];
      }
      if (isProperties(properties, node.tagName)) {
        let key;
        for (key in properties) {
          if (own4.call(properties, key)) {
            addProperty(schema, node.properties, key, properties[key]);
          }
        }
      } else {
        children.unshift(properties);
      }
    }
    while (++index < children.length) {
      addChild(node.children, children[index]);
    }
    if (node.type === "element" && node.tagName === "template") {
      node.content = { type: "root", children: node.children };
      node.children = [];
    }
    return node;
  };
  return h3;
}
function isProperties(value2, name) {
  if (value2 === null || value2 === void 0 || typeof value2 !== "object" || Array.isArray(value2)) {
    return false;
  }
  if (name === "input" || !value2.type || typeof value2.type !== "string") {
    return true;
  }
  if ("children" in value2 && Array.isArray(value2.children)) {
    return false;
  }
  if (name === "button") {
    return buttonTypes.has(value2.type.toLowerCase());
  }
  return !("value" in value2);
}
function addProperty(schema, properties, key, value2) {
  const info = find(schema, key);
  let index = -1;
  let result;
  if (value2 === void 0 || value2 === null)
    return;
  if (typeof value2 === "number") {
    if (Number.isNaN(value2))
      return;
    result = value2;
  } else if (typeof value2 === "boolean") {
    result = value2;
  } else if (typeof value2 === "string") {
    if (info.spaceSeparated) {
      result = parse(value2);
    } else if (info.commaSeparated) {
      result = parse2(value2);
    } else if (info.commaOrSpaceSeparated) {
      result = parse(parse2(value2).join(" "));
    } else {
      result = parsePrimitive(info, info.property, value2);
    }
  } else if (Array.isArray(value2)) {
    result = value2.concat();
  } else {
    result = info.property === "style" ? style(value2) : String(value2);
  }
  if (Array.isArray(result)) {
    const finalResult = [];
    while (++index < result.length) {
      finalResult[index] = parsePrimitive(info, info.property, result[index]);
    }
    result = finalResult;
  }
  if (info.property === "className" && Array.isArray(properties.className)) {
    result = properties.className.concat(result);
  }
  properties[info.property] = result;
}
function addChild(nodes, value2) {
  let index = -1;
  if (value2 === void 0 || value2 === null) {
  } else if (typeof value2 === "string" || typeof value2 === "number") {
    nodes.push({ type: "text", value: String(value2) });
  } else if (Array.isArray(value2)) {
    while (++index < value2.length) {
      addChild(nodes, value2[index]);
    }
  } else if (typeof value2 === "object" && "type" in value2) {
    if (value2.type === "root") {
      addChild(nodes, value2.children);
    } else {
      nodes.push(value2);
    }
  } else {
    throw new Error("Expected node, nodes, or string, got `" + value2 + "`");
  }
}
function parsePrimitive(info, name, value2) {
  if (typeof value2 === "string") {
    if (info.number && value2 && !Number.isNaN(Number(value2))) {
      return Number(value2);
    }
    if ((info.boolean || info.overloadedBoolean) && (value2 === "" || normalize2(value2) === normalize2(name))) {
      return true;
    }
  }
  return value2;
}
function style(value2) {
  const result = [];
  let key;
  for (key in value2) {
    if (own4.call(value2, key)) {
      result.push([key, value2[key]].join(": "));
    }
  }
  return result.join("; ");
}
function createAdjustMap(values) {
  const result = {};
  let index = -1;
  while (++index < values.length) {
    result[values[index].toLowerCase()] = values[index];
  }
  return result;
}

// node_modules/hastscript/lib/html.js
var h = core(html2, "div");

// node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];

// node_modules/character-reference-invalid/index.js
var characterReferenceInvalid = {
  0: "\uFFFD",
  128: "\u20AC",
  130: "\u201A",
  131: "\u0192",
  132: "\u201E",
  133: "\u2026",
  134: "\u2020",
  135: "\u2021",
  136: "\u02C6",
  137: "\u2030",
  138: "\u0160",
  139: "\u2039",
  140: "\u0152",
  142: "\u017D",
  145: "\u2018",
  146: "\u2019",
  147: "\u201C",
  148: "\u201D",
  149: "\u2022",
  150: "\u2013",
  151: "\u2014",
  152: "\u02DC",
  153: "\u2122",
  154: "\u0161",
  155: "\u203A",
  156: "\u0153",
  158: "\u017E",
  159: "\u0178"
};

// node_modules/is-decimal/index.js
function isDecimal(character) {
  const code2 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code2 >= 48 && code2 <= 57;
}

// node_modules/is-hexadecimal/index.js
function isHexadecimal(character) {
  const code2 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code2 >= 97 && code2 <= 102 || code2 >= 65 && code2 <= 70 || code2 >= 48 && code2 <= 57;
}

// node_modules/is-alphabetical/index.js
function isAlphabetical(character) {
  const code2 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code2 >= 97 && code2 <= 122 || code2 >= 65 && code2 <= 90;
}

// node_modules/is-alphanumerical/index.js
function isAlphanumerical(character) {
  return isAlphabetical(character) || isDecimal(character);
}

// node_modules/parse-entities/lib/index.js
init_decode_named_character_reference();
var fromCharCode = String.fromCharCode;
var messages = [
  "",
  "Named character references must be terminated by a semicolon",
  "Numeric character references must be terminated by a semicolon",
  "Named character references cannot be empty",
  "Numeric character references cannot be empty",
  "Named character references must be known",
  "Numeric character references cannot be disallowed",
  "Numeric character references cannot be outside the permissible Unicode range"
];
function parseEntities(value2, options2 = {}) {
  const additional = typeof options2.additional === "string" ? options2.additional.charCodeAt(0) : options2.additional;
  const result = [];
  let index = 0;
  let lines = -1;
  let queue = "";
  let point;
  let indent2;
  if (options2.position) {
    if ("start" in options2.position || "indent" in options2.position) {
      indent2 = options2.position.indent;
      point = options2.position.start;
    } else {
      point = options2.position;
    }
  }
  let line = (point ? point.line : 0) || 1;
  let column = (point ? point.column : 0) || 1;
  let previous2 = now();
  let character;
  index--;
  while (++index <= value2.length) {
    if (character === 10) {
      column = (indent2 ? indent2[lines] : 0) || 1;
    }
    character = value2.charCodeAt(index);
    if (character === 38) {
      const following = value2.charCodeAt(index + 1);
      if (following === 9 || following === 10 || following === 12 || following === 32 || following === 38 || following === 60 || Number.isNaN(following) || additional && following === additional) {
        queue += fromCharCode(character);
        column++;
        continue;
      }
      const start = index + 1;
      let begin = start;
      let end = start;
      let type;
      if (following === 35) {
        end = ++begin;
        const following2 = value2.charCodeAt(end);
        if (following2 === 88 || following2 === 120) {
          type = "hexadecimal";
          end = ++begin;
        } else {
          type = "decimal";
        }
      } else {
        type = "named";
      }
      let characterReferenceCharacters = "";
      let characterReference = "";
      let characters = "";
      const test = type === "named" ? isAlphanumerical : type === "decimal" ? isDecimal : isHexadecimal;
      end--;
      while (++end <= value2.length) {
        const following2 = value2.charCodeAt(end);
        if (!test(following2)) {
          break;
        }
        characters += fromCharCode(following2);
        if (type === "named" && characterEntitiesLegacy.includes(characters)) {
          characterReferenceCharacters = characters;
          characterReference = decodeNamedCharacterReference(characters);
        }
      }
      let terminated = value2.charCodeAt(end) === 59;
      if (terminated) {
        end++;
        const namedReference = type === "named" ? decodeNamedCharacterReference(characters) : false;
        if (namedReference) {
          characterReferenceCharacters = characters;
          characterReference = namedReference;
        }
      }
      let diff2 = 1 + end - start;
      let reference = "";
      if (!terminated && options2.nonTerminated === false) {
      } else if (!characters) {
        if (type !== "named") {
          warning(4, diff2);
        }
      } else if (type === "named") {
        if (terminated && !characterReference) {
          warning(5, 1);
        } else {
          if (characterReferenceCharacters !== characters) {
            end = begin + characterReferenceCharacters.length;
            diff2 = 1 + end - begin;
            terminated = false;
          }
          if (!terminated) {
            const reason = characterReferenceCharacters ? 1 : 3;
            if (options2.attribute) {
              const following2 = value2.charCodeAt(end);
              if (following2 === 61) {
                warning(reason, diff2);
                characterReference = "";
              } else if (isAlphanumerical(following2)) {
                characterReference = "";
              } else {
                warning(reason, diff2);
              }
            } else {
              warning(reason, diff2);
            }
          }
        }
        reference = characterReference;
      } else {
        if (!terminated) {
          warning(2, diff2);
        }
        let referenceCode = Number.parseInt(
          characters,
          type === "hexadecimal" ? 16 : 10
        );
        if (prohibited(referenceCode)) {
          warning(7, diff2);
          reference = fromCharCode(65533);
        } else if (referenceCode in characterReferenceInvalid) {
          warning(6, diff2);
          reference = characterReferenceInvalid[referenceCode];
        } else {
          let output = "";
          if (disallowed(referenceCode)) {
            warning(6, diff2);
          }
          if (referenceCode > 65535) {
            referenceCode -= 65536;
            output += fromCharCode(referenceCode >>> (10 & 1023) | 55296);
            referenceCode = 56320 | referenceCode & 1023;
          }
          reference = output + fromCharCode(referenceCode);
        }
      }
      if (reference) {
        flush();
        previous2 = now();
        index = end - 1;
        column += end - start + 1;
        result.push(reference);
        const next = now();
        next.offset++;
        if (options2.reference) {
          options2.reference.call(
            options2.referenceContext,
            reference,
            { start: previous2, end: next },
            value2.slice(start - 1, end)
          );
        }
        previous2 = next;
      } else {
        characters = value2.slice(start - 1, end);
        queue += characters;
        column += characters.length;
        index = end - 1;
      }
    } else {
      if (character === 10) {
        line++;
        lines++;
        column = 0;
      }
      if (Number.isNaN(character)) {
        flush();
      } else {
        queue += fromCharCode(character);
        column++;
      }
    }
  }
  return result.join("");
  function now() {
    return {
      line,
      column,
      offset: index + ((point ? point.offset : 0) || 0)
    };
  }
  function warning(code2, offset) {
    let position;
    if (options2.warning) {
      position = now();
      position.column += offset;
      position.offset += offset;
      options2.warning.call(
        options2.warningContext,
        messages[code2],
        position,
        code2
      );
    }
  }
  function flush() {
    if (queue) {
      result.push(queue);
      if (options2.text) {
        options2.text.call(options2.textContext, queue, {
          start: previous2,
          end: now()
        });
      }
      queue = "";
    }
  }
}
function prohibited(code2) {
  return code2 >= 55296 && code2 <= 57343 || code2 > 1114111;
}
function disallowed(code2) {
  return code2 >= 1 && code2 <= 8 || code2 === 11 || code2 >= 13 && code2 <= 31 || code2 >= 127 && code2 <= 159 || code2 >= 64976 && code2 <= 65007 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534;
}

// node_modules/refractor/lib/prism-core.js
var uniqueId = 0;
var plainTextGrammar = {};
var _ = {
  util: {
    type: function(o) {
      return Object.prototype.toString.call(o).slice(8, -1);
    },
    objId: function(obj) {
      if (!obj["__id"]) {
        Object.defineProperty(obj, "__id", { value: ++uniqueId });
      }
      return obj["__id"];
    },
    clone: function deepClone(o, visited) {
      visited = visited || {};
      var clone2;
      var id;
      switch (_.util.type(o)) {
        case "Object":
          id = _.util.objId(o);
          if (visited[id]) {
            return visited[id];
          }
          clone2 = {};
          visited[id] = clone2;
          for (var key in o) {
            if (o.hasOwnProperty(key)) {
              clone2[key] = deepClone(o[key], visited);
            }
          }
          return clone2;
        case "Array":
          id = _.util.objId(o);
          if (visited[id]) {
            return visited[id];
          }
          clone2 = [];
          visited[id] = clone2;
          o.forEach(function(v, i2) {
            clone2[i2] = deepClone(v, visited);
          });
          return clone2;
        default:
          return o;
      }
    }
  },
  languages: {
    plain: plainTextGrammar,
    plaintext: plainTextGrammar,
    text: plainTextGrammar,
    txt: plainTextGrammar,
    extend: function(id, redef) {
      var lang = _.util.clone(_.languages[id]);
      for (var key in redef) {
        lang[key] = redef[key];
      }
      return lang;
    },
    insertBefore: function(inside, before, insert, root) {
      root = root || _.languages;
      var grammar = root[inside];
      var ret = {};
      for (var token in grammar) {
        if (grammar.hasOwnProperty(token)) {
          if (token == before) {
            for (var newToken in insert) {
              if (insert.hasOwnProperty(newToken)) {
                ret[newToken] = insert[newToken];
              }
            }
          }
          if (!insert.hasOwnProperty(token)) {
            ret[token] = grammar[token];
          }
        }
      }
      var old = root[inside];
      root[inside] = ret;
      _.languages.DFS(_.languages, function(key, value2) {
        if (value2 === old && key != inside) {
          this[key] = ret;
        }
      });
      return ret;
    },
    DFS: function DFS(o, callback, type, visited) {
      visited = visited || {};
      var objId = _.util.objId;
      for (var i2 in o) {
        if (o.hasOwnProperty(i2)) {
          callback.call(o, i2, o[i2], type || i2);
          var property = o[i2];
          var propertyType = _.util.type(property);
          if (propertyType === "Object" && !visited[objId(property)]) {
            visited[objId(property)] = true;
            DFS(property, callback, null, visited);
          } else if (propertyType === "Array" && !visited[objId(property)]) {
            visited[objId(property)] = true;
            DFS(property, callback, i2, visited);
          }
        }
      }
    }
  },
  plugins: {},
  highlight: function(text2, grammar, language) {
    var env = {
      code: text2,
      grammar,
      language
    };
    _.hooks.run("before-tokenize", env);
    if (!env.grammar) {
      throw new Error('The language "' + env.language + '" has no grammar.');
    }
    env.tokens = _.tokenize(env.code, env.grammar);
    _.hooks.run("after-tokenize", env);
    return Token.stringify(_.util.encode(env.tokens), env.language);
  },
  tokenize: function(text2, grammar) {
    var rest = grammar.rest;
    if (rest) {
      for (var token in rest) {
        grammar[token] = rest[token];
      }
      delete grammar.rest;
    }
    var tokenList = new LinkedList();
    addAfter(tokenList, tokenList.head, text2);
    matchGrammar(text2, tokenList, grammar, tokenList.head, 0);
    return toArray(tokenList);
  },
  hooks: {
    all: {},
    add: function(name, callback) {
      var hooks = _.hooks.all;
      hooks[name] = hooks[name] || [];
      hooks[name].push(callback);
    },
    run: function(name, env) {
      var callbacks = _.hooks.all[name];
      if (!callbacks || !callbacks.length) {
        return;
      }
      for (var i2 = 0, callback; callback = callbacks[i2++]; ) {
        callback(env);
      }
    }
  },
  Token
};
function Token(type, content, alias2, matchedStr) {
  this.type = type;
  this.content = content;
  this.alias = alias2;
  this.length = (matchedStr || "").length | 0;
}
function matchPattern(pattern, pos, text2, lookbehind) {
  pattern.lastIndex = pos;
  var match = pattern.exec(text2);
  if (match && lookbehind && match[1]) {
    var lookbehindLength = match[1].length;
    match.index += lookbehindLength;
    match[0] = match[0].slice(lookbehindLength);
  }
  return match;
}
function matchGrammar(text2, tokenList, grammar, startNode, startPos, rematch) {
  for (var token in grammar) {
    if (!grammar.hasOwnProperty(token) || !grammar[token]) {
      continue;
    }
    var patterns = grammar[token];
    patterns = Array.isArray(patterns) ? patterns : [patterns];
    for (var j = 0; j < patterns.length; ++j) {
      if (rematch && rematch.cause == token + "," + j) {
        return;
      }
      var patternObj = patterns[j];
      var inside = patternObj.inside;
      var lookbehind = !!patternObj.lookbehind;
      var greedy = !!patternObj.greedy;
      var alias2 = patternObj.alias;
      if (greedy && !patternObj.pattern.global) {
        var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
        patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
      }
      var pattern = patternObj.pattern || patternObj;
      for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
        if (rematch && pos >= rematch.reach) {
          break;
        }
        var str = currentNode.value;
        if (tokenList.length > text2.length) {
          return;
        }
        if (str instanceof Token) {
          continue;
        }
        var removeCount = 1;
        var match;
        if (greedy) {
          match = matchPattern(pattern, pos, text2, lookbehind);
          if (!match || match.index >= text2.length) {
            break;
          }
          var from = match.index;
          var to = match.index + match[0].length;
          var p = pos;
          p += currentNode.value.length;
          while (from >= p) {
            currentNode = currentNode.next;
            p += currentNode.value.length;
          }
          p -= currentNode.value.length;
          pos = p;
          if (currentNode.value instanceof Token) {
            continue;
          }
          for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
            removeCount++;
            p += k.value.length;
          }
          removeCount--;
          str = text2.slice(pos, p);
          match.index -= pos;
        } else {
          match = matchPattern(pattern, 0, str, lookbehind);
          if (!match) {
            continue;
          }
        }
        var from = match.index;
        var matchStr = match[0];
        var before = str.slice(0, from);
        var after = str.slice(from + matchStr.length);
        var reach = pos + str.length;
        if (rematch && reach > rematch.reach) {
          rematch.reach = reach;
        }
        var removeFrom = currentNode.prev;
        if (before) {
          removeFrom = addAfter(tokenList, removeFrom, before);
          pos += before.length;
        }
        removeRange(tokenList, removeFrom, removeCount);
        var wrapped = new Token(
          token,
          inside ? _.tokenize(matchStr, inside) : matchStr,
          alias2,
          matchStr
        );
        currentNode = addAfter(tokenList, removeFrom, wrapped);
        if (after) {
          addAfter(tokenList, currentNode, after);
        }
        if (removeCount > 1) {
          var nestedRematch = {
            cause: token + "," + j,
            reach
          };
          matchGrammar(
            text2,
            tokenList,
            grammar,
            currentNode.prev,
            pos,
            nestedRematch
          );
          if (rematch && nestedRematch.reach > rematch.reach) {
            rematch.reach = nestedRematch.reach;
          }
        }
      }
    }
  }
}
function LinkedList() {
  var head = { value: null, prev: null, next: null };
  var tail = { value: null, prev: head, next: null };
  head.next = tail;
  this.head = head;
  this.tail = tail;
  this.length = 0;
}
function addAfter(list, node, value2) {
  var next = node.next;
  var newNode = { value: value2, prev: node, next };
  node.next = newNode;
  next.prev = newNode;
  list.length++;
  return newNode;
}
function removeRange(list, node, count) {
  var next = node.next;
  for (var i2 = 0; i2 < count && next !== list.tail; i2++) {
    next = next.next;
  }
  node.next = next;
  next.prev = node;
  list.length -= i2;
}
function toArray(list) {
  var array = [];
  var node = list.head.next;
  while (node !== list.tail) {
    array.push(node.value);
    node = node.next;
  }
  return array;
}
var Prism = _;

// node_modules/refractor/lib/core.js
var own6 = {}.hasOwnProperty;
function Refractor() {
}
Refractor.prototype = Prism;
var refractor = new Refractor();
refractor.highlight = highlight;
refractor.register = register;
refractor.alias = alias;
refractor.registered = registered;
refractor.listLanguages = listLanguages;
refractor.util.encode = encode;
refractor.Token.stringify = stringify;
function highlight(value2, language) {
  if (typeof value2 !== "string") {
    throw new TypeError("Expected `string` for `value`, got `" + value2 + "`");
  }
  let grammar;
  let name;
  if (language && typeof language === "object") {
    grammar = language;
  } else {
    name = language;
    if (typeof name !== "string") {
      throw new TypeError("Expected `string` for `name`, got `" + name + "`");
    }
    if (own6.call(refractor.languages, name)) {
      grammar = refractor.languages[name];
    } else {
      throw new Error("Unknown language: `" + name + "` is not registered");
    }
  }
  return {
    type: "root",
    children: Prism.highlight.call(refractor, value2, grammar, name)
  };
}
function register(syntax) {
  if (typeof syntax !== "function" || !syntax.displayName) {
    throw new Error("Expected `function` for `syntax`, got `" + syntax + "`");
  }
  if (!own6.call(refractor.languages, syntax.displayName)) {
    syntax(refractor);
  }
}
function alias(language, alias2) {
  const languages = refractor.languages;
  let map = {};
  if (typeof language === "string") {
    if (alias2) {
      map[language] = alias2;
    }
  } else {
    map = language;
  }
  let key;
  for (key in map) {
    if (own6.call(map, key)) {
      const value2 = map[key];
      const list = typeof value2 === "string" ? [value2] : value2;
      let index = -1;
      while (++index < list.length) {
        languages[list[index]] = languages[key];
      }
    }
  }
}
function registered(aliasOrLanguage) {
  if (typeof aliasOrLanguage !== "string") {
    throw new TypeError(
      "Expected `string` for `aliasOrLanguage`, got `" + aliasOrLanguage + "`"
    );
  }
  return own6.call(refractor.languages, aliasOrLanguage);
}
function listLanguages() {
  const languages = refractor.languages;
  const list = [];
  let language;
  for (language in languages) {
    if (own6.call(languages, language) && typeof languages[language] === "object") {
      list.push(language);
    }
  }
  return list;
}
function stringify(value2, language) {
  if (typeof value2 === "string") {
    return { type: "text", value: value2 };
  }
  if (Array.isArray(value2)) {
    const result = [];
    let index = -1;
    while (++index < value2.length) {
      if (value2[index] !== "" && value2[index] !== null && value2[index] !== void 0) {
        result.push(stringify(value2[index], language));
      }
    }
    return result;
  }
  const env = {
    type: value2.type,
    content: stringify(value2.content, language),
    tag: "span",
    classes: ["token", value2.type],
    attributes: {},
    language
  };
  if (value2.alias) {
    env.classes.push(
      ...typeof value2.alias === "string" ? [value2.alias] : value2.alias
    );
  }
  refractor.hooks.run("wrap", env);
  return h(
    env.tag + "." + env.classes.join("."),
    attributes(env.attributes),
    env.content
  );
}
function encode(tokens) {
  return tokens;
}
function attributes(attrs) {
  let key;
  for (key in attrs) {
    if (own6.call(attrs, key)) {
      attrs[key] = parseEntities(attrs[key]);
    }
  }
  return attrs;
}

// node_modules/refractor/lib/common.js
refractor.register(clike);
refractor.register(c);
refractor.register(cpp);
refractor.register(arduino);
refractor.register(bash);
refractor.register(csharp);
refractor.register(markup);
refractor.register(css);
refractor.register(diff);
refractor.register(go);
refractor.register(ini);
refractor.register(java);
refractor.register(regex2);
refractor.register(javascript);
refractor.register(json);
refractor.register(kotlin);
refractor.register(less);
refractor.register(lua);
refractor.register(makefile);
refractor.register(yaml);
refractor.register(markdown);
refractor.register(objectivec);
refractor.register(perl);
refractor.register(markupTemplating);
refractor.register(php);
refractor.register(python);
refractor.register(r);
refractor.register(ruby);
refractor.register(rust);
refractor.register(sass);
refractor.register(scss);
refractor.register(sql);
refractor.register(swift);
refractor.register(typescript);
refractor.register(basic);
refractor.register(vbnet);

// node_modules/refractor/lang/jsx.js
jsx.displayName = "jsx";
jsx.aliases = [];
function jsx(Prism2) {
  Prism2.register(javascript);
  Prism2.register(markup);
  (function(Prism3) {
    var javascript2 = Prism3.util.clone(Prism3.languages.javascript);
    var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
    var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
    var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
    function re(source, flags) {
      source = source.replace(/<S>/g, function() {
        return space;
      }).replace(/<BRACES>/g, function() {
        return braces;
      }).replace(/<SPREAD>/g, function() {
        return spread;
      });
      return RegExp(source, flags);
    }
    spread = re(spread).source;
    Prism3.languages.jsx = Prism3.languages.extend("markup", javascript2);
    Prism3.languages.jsx.tag.pattern = re(
      /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
    );
    Prism3.languages.jsx.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/;
    Prism3.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
    Prism3.languages.jsx.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
    Prism3.languages.jsx.tag.inside["comment"] = javascript2["comment"];
    Prism3.languages.insertBefore(
      "inside",
      "attr-name",
      {
        spread: {
          pattern: re(/<SPREAD>/.source),
          inside: Prism3.languages.jsx
        }
      },
      Prism3.languages.jsx.tag
    );
    Prism3.languages.insertBefore(
      "inside",
      "special-attr",
      {
        script: {
          pattern: re(/=<BRACES>/.source),
          alias: "language-javascript",
          inside: {
            "script-punctuation": {
              pattern: /^=(?=\{)/,
              alias: "punctuation"
            },
            rest: Prism3.languages.jsx
          }
        }
      },
      Prism3.languages.jsx.tag
    );
    var stringifyToken = function(token) {
      if (!token) {
        return "";
      }
      if (typeof token === "string") {
        return token;
      }
      if (typeof token.content === "string") {
        return token.content;
      }
      return token.content.map(stringifyToken).join("");
    };
    var walkTokens2 = function(tokens) {
      var openedTags = [];
      for (var i2 = 0; i2 < tokens.length; i2++) {
        var token = tokens[i2];
        var notTagNorBrace = false;
        if (typeof token !== "string") {
          if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
            if (token.content[0].content[0].content === "</") {
              if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
                openedTags.pop();
              }
            } else {
              if (token.content[token.content.length - 1].content === "/>") {
              } else {
                openedTags.push({
                  tagName: stringifyToken(token.content[0].content[1]),
                  openedBraces: 0
                });
              }
            }
          } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") {
            openedTags[openedTags.length - 1].openedBraces++;
          } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
            openedTags[openedTags.length - 1].openedBraces--;
          } else {
            notTagNorBrace = true;
          }
        }
        if (notTagNorBrace || typeof token === "string") {
          if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
            var plainText = stringifyToken(token);
            if (i2 < tokens.length - 1 && (typeof tokens[i2 + 1] === "string" || tokens[i2 + 1].type === "plain-text")) {
              plainText += stringifyToken(tokens[i2 + 1]);
              tokens.splice(i2 + 1, 1);
            }
            if (i2 > 0 && (typeof tokens[i2 - 1] === "string" || tokens[i2 - 1].type === "plain-text")) {
              plainText = stringifyToken(tokens[i2 - 1]) + plainText;
              tokens.splice(i2 - 1, 1);
              i2--;
            }
            tokens[i2] = new Prism3.Token(
              "plain-text",
              plainText,
              null,
              plainText
            );
          }
        }
        if (token.content && typeof token.content !== "string") {
          walkTokens2(token.content);
        }
      }
    };
    Prism3.hooks.add("after-tokenize", function(env) {
      if (env.language !== "jsx" && env.language !== "tsx") {
        return;
      }
      walkTokens2(env.tokens);
    });
  })(Prism2);
}

// node_modules/refractor/lang/tsx.js
tsx.displayName = "tsx";
tsx.aliases = [];
function tsx(Prism2) {
  Prism2.register(jsx);
  Prism2.register(typescript);
  (function(Prism3) {
    var typescript2 = Prism3.util.clone(Prism3.languages.typescript);
    Prism3.languages.tsx = Prism3.languages.extend("jsx", typescript2);
    delete Prism3.languages.tsx["parameter"];
    delete Prism3.languages.tsx["literal-property"];
    var tag = Prism3.languages.tsx.tag;
    tag.pattern = RegExp(
      /(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")",
      tag.pattern.flags
    );
    tag.lookbehind = true;
  })(Prism2);
}

// packages/qwik-city/buildtime/markdown/syntax-highlight.ts
function rehypeSyntaxHighlight() {
  refractor.register(tsx);
  return async (ast) => {
    visit(ast, "element", (node, _index, parent) => {
      if (!parent || parent.tagName !== "pre" || node.tagName !== "code" || !Array.isArray(node.properties.className)) {
        return;
      }
      for (let i2 = 0; i2 < node.properties.className.length; i2++) {
        const className = node.properties.className[i2];
        const lang = getLanguage(className);
        if (lang && refractor.registered(lang)) {
          node.properties.className[i2] = "language-" + lang;
          syntaxHighlight(node, lang);
          return;
        }
      }
    });
  };
}
function syntaxHighlight(node, lang) {
  const code2 = toString(node);
  const result = refractor.highlight(code2, lang);
  if (result && Array.isArray(node.children)) {
    node.children = result.children;
  }
}
function getLanguage(className) {
  if (typeof className === "string") {
    className = className.toLowerCase();
    if (className.startsWith("language-")) {
      return className.slice(9);
    }
  }
  return null;
}

// packages/qwik-city/buildtime/markdown/mdx.ts
async function createMdxTransformer(ctx) {
  const { createFormatAwareProcessors } = await import("@mdx-js/mdx/lib/util/create-format-aware-processors.js");
  const { default: remarkFrontmatter2 } = await Promise.resolve().then(() => (init_remark_frontmatter(), remark_frontmatter_exports));
  const { default: remarkGfm2 } = await Promise.resolve().then(() => (init_remark_gfm(), remark_gfm_exports));
  const { default: rehypeAutolinkHeadings2 } = await Promise.resolve().then(() => (init_rehype_autolink_headings(), rehype_autolink_headings_exports));
  const { VFile } = await import("vfile");
  const userMdxOpts = ctx.opts.mdx;
  const userRemarkPlugins = userMdxOpts.remarkPlugins || [];
  const userRehypePlugins = userMdxOpts.rehypePlugins || [];
  const coreMdxPlugins = ctx.opts.mdxPlugins;
  const coreRemarkPlugins = [];
  if (typeof (coreMdxPlugins == null ? void 0 : coreMdxPlugins.remarkGfm) === "undefined" || coreMdxPlugins.remarkGfm) {
    coreRemarkPlugins.push(remarkGfm2);
  }
  const coreRehypePlugins = [];
  if (typeof (coreMdxPlugins == null ? void 0 : coreMdxPlugins.rehypeSyntaxHighlight) === "undefined" || coreMdxPlugins.rehypeSyntaxHighlight) {
    coreRehypePlugins.push(rehypeSyntaxHighlight);
  }
  if (typeof (coreMdxPlugins == null ? void 0 : coreMdxPlugins.rehypeAutolinkHeadings) === "undefined" || coreMdxPlugins.rehypeAutolinkHeadings) {
    coreRehypePlugins.push(rehypeAutolinkHeadings2);
  }
  const mdxOpts = {
    SourceMapGenerator: import_source_map.SourceMapGenerator,
    jsxImportSource: "@builder.io/qwik",
    ...userMdxOpts,
    remarkPlugins: [
      ...userRemarkPlugins,
      ...coreRemarkPlugins,
      remarkFrontmatter2,
      [parseFrontmatter, ctx]
    ],
    rehypePlugins: [...userRehypePlugins, ...coreRehypePlugins, [rehypePage, ctx]]
  };
  const { extnames, process: process2 } = createFormatAwareProcessors(mdxOpts);
  return async function(code2, id) {
    const ext = getExtension(id);
    if (extnames.includes(ext)) {
      const file = new VFile({ value: code2, path: id });
      const compiled = await process2(file);
      return {
        code: String(compiled.value),
        map: compiled.map
      };
    }
  };
}

// packages/qwik-city/buildtime/vite/plugin.ts
var import_node_path8 = require("path");

// packages/qwik-city/buildtime/runtime-generation/generate-entries.ts
function createEntries(ctx, c2) {
  const isClient = ctx.target === "client";
  const entries = [...ctx.entries, ...ctx.serviceWorkers];
  if (isClient && entries.length > 0) {
    c2.push(`
/** Qwik City Entries Entry */`);
    c2.push(`export const e = () => import("@qwik-city-entries");
`);
  }
}
function generateQwikCityEntries(ctx) {
  const c2 = [];
  const entries = [...ctx.entries, ...ctx.serviceWorkers];
  c2.push(`
/** Qwik City Entries (${entries.length}) */`);
  for (let i2 = 0; i2 < entries.length; i2++) {
    const entry = entries[i2];
    c2.push(`export const ${entry.id} = () => import(${JSON.stringify(entry.filePath)});`);
  }
  return c2.join("\n") + "\n";
}

// packages/qwik-city/buildtime/runtime-generation/utils.ts
function getImportPath(importPath) {
  if (importPath.endsWith(".tsx") || importPath.endsWith(".jsx")) {
    return importPath.slice(0, importPath.length - 4);
  }
  if (importPath.endsWith(".ts")) {
    return importPath.slice(0, importPath.length - 3);
  }
  return importPath;
}

// packages/qwik-city/buildtime/runtime-generation/generate-menus.ts
function createMenus(ctx, c2, esmImports) {
  c2.push(`
/** Qwik City Menus (${ctx.menus.length}) */`);
  c2.push(`export const menus = [`);
  const dynamicImports = ctx.target === "client";
  const routesDir = ctx.opts.routesDir;
  for (const m2 of ctx.menus) {
    const importPath = JSON.stringify(getImportPath(m2.filePath));
    if (dynamicImports) {
      c2.push(`  [${JSON.stringify(m2.pathname)}, ()=>import(${importPath})],`);
    } else {
      const id = createFileId(routesDir, m2.filePath);
      esmImports.push(`import * as ${id} from ${importPath};`);
      c2.push(`  [${JSON.stringify(m2.pathname)}, ()=>${id}],`);
    }
  }
  c2.push(`];`);
}

// packages/qwik-city/buildtime/runtime-generation/generate-routes.ts
function createRoutes(ctx, qwikPlugin, c2, esmImports) {
  const isSsr = ctx.target === "ssr";
  const includeEndpoints = isSsr;
  const dynamicImports = ctx.target === "client";
  if (ctx.layouts.length > 0) {
    c2.push(`
/** Qwik City Layouts (${ctx.layouts.length}) */`);
    for (const layout of ctx.layouts) {
      const importPath = JSON.stringify(getImportPath(layout.filePath));
      if (dynamicImports) {
        c2.push(`const ${layout.id} = ()=>import(${importPath});`);
      } else {
        esmImports.push(`import * as ${layout.id}_ from ${importPath};`);
        c2.push(`const ${layout.id} = ()=>${layout.id}_;`);
      }
    }
  }
  c2.push(`
/** Qwik City Routes (${ctx.routes.length}) */`);
  c2.push(`export const routes = [`);
  for (const route of ctx.routes) {
    const loaders = [];
    if (isPageExt(route.ext)) {
      for (const layout of route.layouts) {
        loaders.push(layout.id);
      }
      const importPath = getImportPath(route.filePath);
      if (dynamicImports) {
        loaders.push(`()=>import(${JSON.stringify(importPath)})`);
      } else {
        esmImports.push(`import * as ${route.id} from ${JSON.stringify(importPath)};`);
        loaders.push(`()=>${route.id}`);
      }
    } else if (includeEndpoints && isModuleExt(route.ext)) {
      const importPath = getImportPath(route.filePath);
      esmImports.push(`import * as ${route.id} from ${JSON.stringify(importPath)};`);
      loaders.push(`()=>${route.id}`);
    }
    if (loaders.length > 0) {
      c2.push(`  ${createRouteData(qwikPlugin, route, loaders, isSsr)},`);
    }
  }
  c2.push(`];`);
}
function createRouteData(qwikPlugin, r3, loaders, isSsr) {
  const pattern = r3.pattern.toString();
  const moduleLoaders = `[ ${loaders.join(", ")} ]`;
  if (isSsr) {
    const paramNames = r3.paramNames && r3.paramNames.length > 0 ? JSON.stringify(r3.paramNames) : `undefined`;
    const originalPathname = JSON.stringify(r3.pathname);
    const clientBundleNames = JSON.stringify(getClientRouteBundleNames(qwikPlugin, r3));
    return `[ ${pattern}, ${moduleLoaders}, ${paramNames}, ${originalPathname}, ${clientBundleNames} ]`;
  }
  if (r3.paramNames.length > 0) {
    const paramNames = JSON.stringify(r3.paramNames);
    return `[ ${pattern}, ${moduleLoaders}, ${paramNames} ]`;
  }
  return `[ ${pattern}, ${moduleLoaders} ]`;
}
function getClientRouteBundleNames(qwikPlugin, r3) {
  const bundlesNames = [];
  const manifest = globalThis.QWIK_MANIFEST || qwikPlugin.api.getManifest();
  if (manifest) {
    const manifestBundleNames = Object.keys(manifest.bundles);
    const addRouteFile = (filePath) => {
      filePath = removeExtension(filePath);
      for (const bundleName of manifestBundleNames) {
        const bundle = manifest.bundles[bundleName];
        if (bundle.origins) {
          for (const bundleOrigin of bundle.origins) {
            const originPath = removeExtension(bundleOrigin);
            if (filePath.endsWith(originPath)) {
              if (!bundlesNames.includes(bundleName)) {
                bundlesNames.push(bundleName);
              }
            }
          }
        }
      }
    };
    for (const layout of r3.layouts) {
      addRouteFile(layout.filePath);
    }
    addRouteFile(r3.filePath);
  }
  return bundlesNames;
}

// packages/qwik-city/buildtime/runtime-generation/generate-qwik-city-plan.ts
function generateQwikCityPlan(ctx, qwikPlugin) {
  const esmImports = [];
  const c2 = [];
  c2.push(`
/** Qwik City Plan */`);
  createRoutes(ctx, qwikPlugin, c2, esmImports);
  createMenus(ctx, c2, esmImports);
  createEntries(ctx, c2);
  c2.push(`export const trailingSlash = ${JSON.stringify(!!ctx.opts.trailingSlash)};`);
  c2.push(`export const basePathname = ${JSON.stringify(ctx.opts.basePathname)};`);
  c2.push(`export const cacheModules = ${JSON.stringify(!ctx.isDevServer)};`);
  c2.push(`export default { routes, menus, trailingSlash, basePathname, cacheModules };`);
  return esmImports.join("\n") + c2.join("\n");
}

// packages/qwik-city/buildtime/context.ts
var import_node_path3 = require("path");
function createBuildContext(rootDir, userOpts, target) {
  const ctx = {
    rootDir: normalizePath(rootDir),
    opts: normalizeOptions(rootDir, userOpts),
    routes: [],
    errors: [],
    layouts: [],
    entries: [],
    serviceWorkers: [],
    menus: [],
    diagnostics: [],
    frontmatter: /* @__PURE__ */ new Map(),
    target: target || "ssr",
    isDevServer: false,
    isDevServerClientOnly: false,
    isDirty: true,
    activeBuild: null
  };
  return ctx;
}
function resetBuildContext(ctx) {
  if (ctx) {
    ctx.routes.length = 0;
    ctx.errors.length = 0;
    ctx.layouts.length = 0;
    ctx.entries.length = 0;
    ctx.menus.length = 0;
    ctx.diagnostics.length = 0;
    ctx.frontmatter.clear();
    ctx.isDirty = true;
  }
}
function normalizeOptions(rootDir, userOpts) {
  const opts = { ...userOpts };
  if (typeof opts.routesDir !== "string") {
    opts.routesDir = (0, import_node_path3.resolve)(rootDir, "src", "routes");
  } else if (!(0, import_node_path3.isAbsolute)(opts.routesDir)) {
    opts.routesDir = (0, import_node_path3.resolve)(rootDir, opts.routesDir);
  }
  opts.routesDir = normalizePath(opts.routesDir);
  if (typeof opts.baseUrl === "string") {
    opts.basePathname = opts.baseUrl;
  }
  if (typeof opts.basePathname !== "string") {
    opts.basePathname = "/";
  } else {
    const url = new URL(opts.basePathname, "https://qwik.builer.io/");
    opts.basePathname = url.pathname;
    if (!opts.basePathname.endsWith("/")) {
      opts.basePathname += "/";
    }
  }
  if (typeof opts.trailingSlash !== "boolean") {
    opts.trailingSlash = false;
  }
  opts.mdx = opts.mdx || {};
  return opts;
}

// packages/qwik-city/buildtime/vite/validate-plugin.ts
var import_node_fs2 = __toESM(require("fs"), 1);
var import_node_path4 = require("path");
async function validatePlugin(opts) {
  if (typeof opts.routesDir !== "string") {
    throw new Error(`qwikCity plugin "routesDir" option missing`);
  }
  if (!(0, import_node_path4.isAbsolute)(opts.routesDir)) {
    throw new Error(
      `qwikCity plugin "routesDir" option must be an absolute path: ${opts.routesDir}`
    );
  }
  try {
    const s3 = await import_node_fs2.default.promises.stat(opts.routesDir);
    if (!s3.isDirectory()) {
      throw new Error(`qwikCity plugin "routesDir" option must be a directory: ${opts.routesDir}`);
    }
  } catch (e2) {
    throw new Error(`qwikCity plugin "routesDir" not found: ${e2}`);
  }
}

// packages/qwik-city/buildtime/routing/walk-routes-dir.ts
var import_node_fs3 = __toESM(require("fs"), 1);
var import_node_path5 = require("path");
async function walkRoutes(routesDir) {
  const sourceFiles = [];
  await walkRouteDir(sourceFiles, normalizePath(routesDir), (0, import_node_path5.basename)(routesDir));
  return sourceFiles;
}
async function walkRouteDir(sourceFiles, dirPath, dirName) {
  try {
    const dirItemNames = await import_node_fs3.default.promises.readdir(dirPath);
    await Promise.all(
      dirItemNames.map(async (itemName) => {
        const itemPath = normalizePath((0, import_node_path5.join)(dirPath, itemName));
        const sourceFileName = getSourceFile(itemName);
        if (sourceFileName !== null) {
          sourceFiles.push({
            ...sourceFileName,
            fileName: itemName,
            filePath: itemPath,
            dirName,
            dirPath
          });
        } else {
          await walkRouteDir(sourceFiles, itemPath, itemName);
        }
      })
    );
  } catch (e2) {
  }
}

// packages/qwik-city/buildtime/routing/resolve-source-file.ts
var import_node_path6 = require("path");

// node_modules/marked/lib/marked.esm.js
function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
var defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = /[&<>"']/g;
var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html3, encode2) {
  if (encode2) {
    if (escapeTest.test(html3)) {
      return html3.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html3)) {
      return html3.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html3;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape2(html3) {
  return html3.replace(unescapeTest, (_2, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex3, opt) {
  regex3 = typeof regex3 === "string" ? regex3 : regex3.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex3 = regex3.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex3, opt);
    }
  };
  return obj;
}
var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape2(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e2) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e2) {
    return null;
  }
  return href;
}
var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain2 = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain2, "$1") + href;
  } else {
    return base + href;
  }
}
var noopTest = { exec: function noopTest2() {
} };
function merge2(obj) {
  let i2 = 1, target, key;
  for (; i2 < arguments.length; i2++) {
    target = arguments[i2];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i2 = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i2 < cells.length; i2++) {
    cells[i2] = cells[i2].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c2, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c2 && !invert) {
      suffLen++;
    } else if (currChar !== c2 && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i2 = 0;
  for (; i2 < l; i2++) {
    if (str[i2] === "\\") {
      i2++;
    } else if (str[i2] === b[0]) {
      level++;
    } else if (str[i2] === b[1]) {
      level--;
      if (level < 0) {
        return i2;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap2, link, raw, lexer2) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text2 = cap2[1].replace(/\\([\[\]])/g, "$1");
  if (cap2[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text: text2,
      tokens: lexer2.inlineTokens(text2)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape(text2)
  };
}
function indentCodeCompensation(raw, text2) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text2;
  }
  const indentToCode = matchIndentToCode[1];
  return text2.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var Tokenizer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  space(src) {
    const cap2 = this.rules.block.newline.exec(src);
    if (cap2 && cap2[0].length > 0) {
      return {
        type: "space",
        raw: cap2[0]
      };
    }
  }
  code(src) {
    const cap2 = this.rules.block.code.exec(src);
    if (cap2) {
      const text2 = cap2[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap2[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text2, "\n") : text2
      };
    }
  }
  fences(src) {
    const cap2 = this.rules.block.fences.exec(src);
    if (cap2) {
      const raw = cap2[0];
      const text2 = indentCodeCompensation(raw, cap2[3] || "");
      return {
        type: "code",
        raw,
        lang: cap2[2] ? cap2[2].trim() : cap2[2],
        text: text2
      };
    }
  }
  heading(src) {
    const cap2 = this.rules.block.heading.exec(src);
    if (cap2) {
      let text2 = cap2[2].trim();
      if (/#$/.test(text2)) {
        const trimmed = rtrim(text2, "#");
        if (this.options.pedantic) {
          text2 = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text2 = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap2[0],
        depth: cap2[1].length,
        text: text2,
        tokens: this.lexer.inline(text2)
      };
    }
  }
  hr(src) {
    const cap2 = this.rules.block.hr.exec(src);
    if (cap2) {
      return {
        type: "hr",
        raw: cap2[0]
      };
    }
  }
  blockquote(src) {
    const cap2 = this.rules.block.blockquote.exec(src);
    if (cap2) {
      const text2 = cap2[0].replace(/^ *>[ \t]?/gm, "");
      return {
        type: "blockquote",
        raw: cap2[0],
        tokens: this.lexer.blockTokens(text2, []),
        text: text2
      };
    }
  }
  list(src) {
    let cap2 = this.rules.block.list.exec(src);
    if (cap2) {
      let raw, istask, ischecked, indent2, i2, blankLine2, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
      let bull = cap2[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      while (src) {
        endEarly = false;
        if (!(cap2 = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap2[0];
        src = src.substring(raw.length);
        line = cap2[2].split("\n", 1)[0];
        nextLine = src.split("\n", 1)[0];
        if (this.options.pedantic) {
          indent2 = 2;
          itemContents = line.trimLeft();
        } else {
          indent2 = cap2[2].search(/[^ ]/);
          indent2 = indent2 > 4 ? 1 : indent2;
          itemContents = line.slice(indent2);
          indent2 += cap2[1].length;
        }
        blankLine2 = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent2 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent2 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent2 - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent2 - 1)}}#`);
          while (src) {
            rawLine = src.split("\n", 1)[0];
            line = rawLine;
            if (this.options.pedantic) {
              line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(line)) {
              break;
            }
            if (headingBeginRegex.test(line)) {
              break;
            }
            if (nextBulletRegex.test(line)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (line.search(/[^ ]/) >= indent2 || !line.trim()) {
              itemContents += "\n" + line.slice(indent2);
            } else if (!blankLine2) {
              itemContents += "\n" + line;
            } else {
              break;
            }
            if (!blankLine2 && !line.trim()) {
              blankLine2 = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l = list.items.length;
      for (i2 = 0; i2 < l; i2++) {
        this.lexer.state.top = false;
        list.items[i2].tokens = this.lexer.blockTokens(list.items[i2].text, []);
        const spacers = list.items[i2].tokens.filter((t2) => t2.type === "space");
        const hasMultipleLineBreaks = spacers.every((t2) => {
          const chars = t2.raw.split("");
          let lineBreaks = 0;
          for (const char of chars) {
            if (char === "\n") {
              lineBreaks += 1;
            }
            if (lineBreaks > 1) {
              return true;
            }
          }
          return false;
        });
        if (!list.loose && spacers.length && hasMultipleLineBreaks) {
          list.loose = true;
          list.items[i2].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap2 = this.rules.block.html.exec(src);
    if (cap2) {
      const token = {
        type: "html",
        raw: cap2[0],
        pre: !this.options.sanitizer && (cap2[1] === "pre" || cap2[1] === "script" || cap2[1] === "style"),
        text: cap2[0]
      };
      if (this.options.sanitize) {
        const text2 = this.options.sanitizer ? this.options.sanitizer(cap2[0]) : escape(cap2[0]);
        token.type = "paragraph";
        token.text = text2;
        token.tokens = this.lexer.inline(text2);
      }
      return token;
    }
  }
  def(src) {
    const cap2 = this.rules.block.def.exec(src);
    if (cap2) {
      if (cap2[3])
        cap2[3] = cap2[3].substring(1, cap2[3].length - 1);
      const tag = cap2[1].toLowerCase().replace(/\s+/g, " ");
      return {
        type: "def",
        tag,
        raw: cap2[0],
        href: cap2[2],
        title: cap2[3]
      };
    }
  }
  table(src) {
    const cap2 = this.rules.block.table.exec(src);
    if (cap2) {
      const item = {
        type: "table",
        header: splitCells(cap2[1]).map((c2) => {
          return { text: c2 };
        }),
        align: cap2[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap2[3] && cap2[3].trim() ? cap2[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap2[0];
        let l = item.align.length;
        let i2, j, k, row;
        for (i2 = 0; i2 < l; i2++) {
          if (/^ *-+: *$/.test(item.align[i2])) {
            item.align[i2] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i2])) {
            item.align[i2] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i2])) {
            item.align[i2] = "left";
          } else {
            item.align[i2] = null;
          }
        }
        l = item.rows.length;
        for (i2 = 0; i2 < l; i2++) {
          item.rows[i2] = splitCells(item.rows[i2], item.header.length).map((c2) => {
            return { text: c2 };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = this.lexer.inline(row[k].text);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap2 = this.rules.block.lheading.exec(src);
    if (cap2) {
      return {
        type: "heading",
        raw: cap2[0],
        depth: cap2[2].charAt(0) === "=" ? 1 : 2,
        text: cap2[1],
        tokens: this.lexer.inline(cap2[1])
      };
    }
  }
  paragraph(src) {
    const cap2 = this.rules.block.paragraph.exec(src);
    if (cap2) {
      const text2 = cap2[1].charAt(cap2[1].length - 1) === "\n" ? cap2[1].slice(0, -1) : cap2[1];
      return {
        type: "paragraph",
        raw: cap2[0],
        text: text2,
        tokens: this.lexer.inline(text2)
      };
    }
  }
  text(src) {
    const cap2 = this.rules.block.text.exec(src);
    if (cap2) {
      return {
        type: "text",
        raw: cap2[0],
        text: cap2[0],
        tokens: this.lexer.inline(cap2[0])
      };
    }
  }
  escape(src) {
    const cap2 = this.rules.inline.escape.exec(src);
    if (cap2) {
      return {
        type: "escape",
        raw: cap2[0],
        text: escape(cap2[1])
      };
    }
  }
  tag(src) {
    const cap2 = this.rules.inline.tag.exec(src);
    if (cap2) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap2[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap2[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap2[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap2[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap2[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap2[0]) : escape(cap2[0]) : cap2[0]
      };
    }
  }
  link(src) {
    const cap2 = this.rules.inline.link.exec(src);
    if (cap2) {
      const trimmedUrl = cap2[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap2[2], "()");
        if (lastParenIndex > -1) {
          const start = cap2[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap2[1].length + lastParenIndex;
          cap2[2] = cap2[2].substring(0, lastParenIndex);
          cap2[0] = cap2[0].substring(0, linkLen).trim();
          cap2[3] = "";
        }
      }
      let href = cap2[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap2[3] ? cap2[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap2, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap2[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap2;
    if ((cap2 = this.rules.inline.reflink.exec(src)) || (cap2 = this.rules.inline.nolink.exec(src))) {
      let link = (cap2[2] || cap2[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text2 = cap2[0].charAt(0);
        return {
          type: "text",
          raw: text2,
          text: text2
        };
      }
      return outputLink(cap2, link, cap2[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        if (Math.min(lLength, rLength) % 2) {
          const text3 = src.slice(1, lLength + match.index + rLength);
          return {
            type: "em",
            raw: src.slice(0, lLength + match.index + rLength + 1),
            text: text3,
            tokens: this.lexer.inlineTokens(text3)
          };
        }
        const text2 = src.slice(2, lLength + match.index + rLength - 1);
        return {
          type: "strong",
          raw: src.slice(0, lLength + match.index + rLength + 1),
          text: text2,
          tokens: this.lexer.inlineTokens(text2)
        };
      }
    }
  }
  codespan(src) {
    const cap2 = this.rules.inline.code.exec(src);
    if (cap2) {
      let text2 = cap2[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text2);
      const hasSpaceCharsOnBothEnds = /^ /.test(text2) && / $/.test(text2);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text2 = text2.substring(1, text2.length - 1);
      }
      text2 = escape(text2, true);
      return {
        type: "codespan",
        raw: cap2[0],
        text: text2
      };
    }
  }
  br(src) {
    const cap2 = this.rules.inline.br.exec(src);
    if (cap2) {
      return {
        type: "br",
        raw: cap2[0]
      };
    }
  }
  del(src) {
    const cap2 = this.rules.inline.del.exec(src);
    if (cap2) {
      return {
        type: "del",
        raw: cap2[0],
        text: cap2[2],
        tokens: this.lexer.inlineTokens(cap2[2])
      };
    }
  }
  autolink(src, mangle2) {
    const cap2 = this.rules.inline.autolink.exec(src);
    if (cap2) {
      let text2, href;
      if (cap2[2] === "@") {
        text2 = escape(this.options.mangle ? mangle2(cap2[1]) : cap2[1]);
        href = "mailto:" + text2;
      } else {
        text2 = escape(cap2[1]);
        href = text2;
      }
      return {
        type: "link",
        raw: cap2[0],
        text: text2,
        href,
        tokens: [
          {
            type: "text",
            raw: text2,
            text: text2
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap2;
    if (cap2 = this.rules.inline.url.exec(src)) {
      let text2, href;
      if (cap2[2] === "@") {
        text2 = escape(this.options.mangle ? mangle2(cap2[0]) : cap2[0]);
        href = "mailto:" + text2;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap2[0];
          cap2[0] = this.rules.inline._backpedal.exec(cap2[0])[0];
        } while (prevCapZero !== cap2[0]);
        text2 = escape(cap2[0]);
        if (cap2[1] === "www.") {
          href = "http://" + text2;
        } else {
          href = text2;
        }
      }
      return {
        type: "link",
        raw: cap2[0],
        text: text2,
        href,
        tokens: [
          {
            type: "text",
            raw: text2,
            text: text2
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap2 = this.rules.inline.text.exec(src);
    if (cap2) {
      let text2;
      if (this.lexer.state.inRawBlock) {
        text2 = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap2[0]) : escape(cap2[0]) : cap2[0];
      } else {
        text2 = escape(this.options.smartypants ? smartypants2(cap2[0]) : cap2[0]);
      }
      return {
        type: "text",
        raw: cap2[0],
        text: text2
      };
    }
  }
};
var block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = merge2({}, block);
block.gfm = merge2({}, block.normal, {
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
});
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = merge2({}, block.normal, {
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline.escapedEmSt = /\\\*|\\_/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = merge2({}, inline);
inline.pedantic = merge2({}, inline.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
});
inline.gfm = merge2({}, inline.normal, {
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = merge2({}, inline.gfm, {
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
function smartypants(text2) {
  return text2.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text2) {
  let out = "", i2, ch;
  const l = text2.length;
  for (i2 = 0; i2 < l; i2++) {
    ch = text2.charCodeAt(i2);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
var Lexer = class {
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  static get rules() {
    return {
      block,
      inline
    };
  }
  static lex(src, options2) {
    const lexer2 = new Lexer(options2);
    return lexer2.lex(src);
  }
  static lexInline(src, options2) {
    const lexer2 = new Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_2, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var Renderer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  code(code2, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code2, lang);
      if (out != null && out !== code2) {
        escaped = true;
        code2 = out;
      }
    }
    code2 = code2.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code2 : escape(code2, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code2 : escape(code2, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html3) {
    return html3;
  }
  heading(text2, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text2}</h${level}>
`;
    }
    return `<h${level}>${text2}</h${level}>
`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text2) {
    return `<li>${text2}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(text2) {
    return `<p>${text2}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  strong(text2) {
    return `<strong>${text2}</strong>`;
  }
  em(text2) {
    return `<em>${text2}</em>`;
  }
  codespan(text2) {
    return `<code>${text2}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(text2) {
    return `<del>${text2}</del>`;
  }
  link(href, title, text2) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text2;
    }
    let out = '<a href="' + escape(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text2 + "</a>";
    return out;
  }
  image(href, title, text2) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text2;
    }
    let out = `<img src="${href}" alt="${text2}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text2) {
    return text2;
  }
};
var TextRenderer = class {
  strong(text2) {
    return text2;
  }
  em(text2) {
    return text2;
  }
  codespan(text2) {
    return text2;
  }
  del(text2) {
    return text2;
  }
  html(text2) {
    return text2;
  }
  text(text2) {
    return text2;
  }
  link(href, title, text2) {
    return "" + text2;
  }
  image(href, title, text2) {
    return "" + text2;
  }
  br() {
    return "";
  }
};
var Slugger = class {
  constructor() {
    this.seen = {};
  }
  serialize(value2) {
    return value2.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug2 = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug2)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug2 = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug2));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug2] = 0;
    }
    return slug2;
  }
  slug(value2, options2 = {}) {
    const slug2 = this.serialize(value2);
    return this.getNextSafeSlug(slug2, options2.dryrun);
  }
};
var Parser = class {
  constructor(options2) {
    this.options = options2 || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  static parse(tokens, options2) {
    const parser2 = new Parser(options2);
    return parser2.parse(tokens);
  }
  static parseInline(tokens, options2) {
    const parser2 = new Parser(options2);
    return parser2.parseInline(tokens);
  }
  parse(tokens, top = true) {
    let out = "", i2, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
    const l = tokens.length;
    for (i2 = 0; i2 < l; i2++) {
      token = tokens[i2];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape2(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger
          );
          continue;
        }
        case "code": {
          out += this.renderer.code(
            token.text,
            token.lang,
            token.escaped
          );
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.header[j].tokens),
              { header: true, align: token.align[j] }
            );
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k].tokens),
                { header: false, align: token.align[k] }
              );
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i2 + 1 < l && tokens[i2 + 1].type === "text") {
            token = tokens[++i2];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i2, token, ret;
    const l = tokens.length;
    for (i2 = 0; i2 < l; i2++) {
      token = tokens[i2];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
function marked(src, opt, callback) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  if (typeof opt === "function") {
    callback = opt;
    opt = null;
  }
  opt = merge2({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    const highlight2 = opt.highlight;
    let tokens;
    try {
      tokens = Lexer.lex(src, opt);
    } catch (e2) {
      return callback(e2);
    }
    const done = function(err) {
      let out;
      if (!err) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser.parse(tokens, opt);
        } catch (e2) {
          err = e2;
        }
      }
      opt.highlight = highlight2;
      return err ? callback(err) : callback(null, out);
    };
    if (!highlight2 || highlight2.length < 3) {
      return done();
    }
    delete opt.highlight;
    if (!tokens.length)
      return done();
    let pending = 0;
    marked.walkTokens(tokens, function(token) {
      if (token.type === "code") {
        pending++;
        setTimeout(() => {
          highlight2(token.text, token.lang, function(err, code2) {
            if (err) {
              return done(err);
            }
            if (code2 != null && code2 !== token.text) {
              token.text = code2;
              token.escaped = true;
            }
            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });
    if (pending === 0) {
      done();
    }
    return;
  }
  function onError(e2) {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
    }
    throw e2;
  }
  try {
    const tokens = Lexer.lex(src, opt);
    if (opt.walkTokens) {
      if (opt.async) {
        return Promise.all(marked.walkTokens(tokens, opt.walkTokens)).then(() => {
          return Parser.parse(tokens, opt);
        }).catch(onError);
      }
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parse(tokens, opt);
  } catch (e2) {
    onError(e2);
  }
}
marked.options = marked.setOptions = function(opt) {
  merge2(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
marked.use = function(...args) {
  const opts = merge2({}, ...args);
  const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
  let hasExtensions;
  args.forEach((pack) => {
    if (pack.extensions) {
      hasExtensions = true;
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
    }
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.walkTokens) {
      const walkTokens2 = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        let values = [];
        values.push(pack.walkTokens.call(this, token));
        if (walkTokens2) {
          values = values.concat(walkTokens2.call(this, token));
        }
        return values;
      };
    }
    if (hasExtensions) {
      opts.extensions = extensions;
    }
    marked.setOptions(opts);
  });
};
marked.walkTokens = function(tokens, callback) {
  let values = [];
  for (const token of tokens) {
    values = values.concat(callback.call(marked, token));
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          values = values.concat(marked.walkTokens(cell.tokens, callback));
        }
        for (const row of token.rows) {
          for (const cell of row) {
            values = values.concat(marked.walkTokens(cell.tokens, callback));
          }
        }
        break;
      }
      case "list": {
        values = values.concat(marked.walkTokens(token.items, callback));
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            values = values.concat(marked.walkTokens(token[childTokens], callback));
          });
        } else if (token.tokens) {
          values = values.concat(marked.walkTokens(token.tokens, callback));
        }
      }
    }
  }
  return values;
};
marked.parseInline = function(src, opt) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked.parseInline(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  opt = merge2({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  try {
    const tokens = Lexer.lexInline(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parseInline(tokens, opt);
  } catch (e2) {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
    }
    throw e2;
  }
};
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = Parser.parse;
var lexer = Lexer.lex;

// packages/qwik-city/buildtime/markdown/menu.ts
function createMenu(opts, filePath) {
  const menu = {
    pathname: getMenuPathname(opts, filePath),
    filePath
  };
  return menu;
}
function resolveMenu(opts, menuSourceFile) {
  return createMenu(opts, menuSourceFile.filePath);
}
async function transformMenu(opts, filePath, content) {
  const parsedMenu = parseMenu(opts, filePath, content);
  const id = createFileId(opts.routesDir, filePath);
  const code2 = `const ${id} = ${JSON.stringify(parsedMenu, null, 2)};`;
  return `${code2} export default ${id}`;
}
function parseMenu(opts, filePath, content, checkFileExists = true) {
  const tokens = marked.lexer(content, {});
  let currentDepth = 0;
  const stack = [];
  for (const t2 of tokens) {
    if (t2.type === "heading") {
      const diff2 = currentDepth - t2.depth;
      if (diff2 >= 0) {
        stack.length -= diff2 + 1;
      }
      if (diff2 < -1) {
        throw new Error(
          `Menu hierarchy skipped a level, went from <h${"#".repeat(
            currentDepth
          )}> to <h${"#".repeat(t2.depth)}>, in menu: ${filePath}`
        );
      }
      currentDepth = t2.depth;
      const parentNode = stack[stack.length - 1];
      for (const h2Token of t2.tokens) {
        const lastNode = {
          text: ""
        };
        if (h2Token.type === "text") {
          lastNode.text = h2Token.text;
        } else if (h2Token.type === "link") {
          lastNode.text = h2Token.text;
          lastNode.href = getMarkdownRelativeUrl(opts, filePath, h2Token.href, checkFileExists);
        } else {
          throw new Error(
            `Headings can only be a text or link. Received "${h2Token.type}", value "${h2Token.raw}", in menu: ${filePath}`
          );
        }
        if (parentNode) {
          parentNode.items = parentNode.items || [];
          parentNode.items.push(lastNode);
        }
        stack.push(lastNode);
      }
    } else if (t2.type === "list") {
      const parentNode = stack[stack.length - 1];
      parentNode.items = parentNode.items || [];
      for (const li of t2.items) {
        if (li.type === "list_item") {
          for (const liToken of li.tokens) {
            if (liToken.type === "text") {
              for (const liItem of liToken.tokens) {
                if (liItem.type === "text") {
                  parentNode.items.push({ text: liItem.text });
                } else if (liItem.type === "link") {
                  parentNode.items.push({
                    text: liItem.text,
                    href: getMarkdownRelativeUrl(opts, filePath, liItem.href, checkFileExists)
                  });
                } else {
                  throw new Error(
                    `List items can only be a text or link. Received "${liItem.type}", value "${liItem.raw}", in menu: ${filePath}`
                  );
                }
              }
            } else if (liToken.type === "link") {
              parentNode.items.push({
                text: liToken.text,
                href: getMarkdownRelativeUrl(opts, filePath, liToken.href, checkFileExists)
              });
            } else {
              throw new Error(
                `List items can only be a text or link. Received "${liToken.type}", value "${liToken.raw}", in menu: ${filePath}`
              );
            }
          }
        } else {
          throw new Error(
            `Only list items can be used in lists. Received "${li.type}", value "${li.raw}", in menu: ${filePath}`
          );
        }
      }
    } else if (t2.type === "space") {
      continue;
    } else {
      throw new Error(
        `Menu has a "${t2.type}" with the value "${t2.raw}". However, only headings and lists can be used in the menu: ${filePath}`
      );
    }
  }
  if (stack.length === 0) {
    throw new Error(`Menu must start with an h1 in the index: ${filePath}`);
  }
  return stack[0];
}

// packages/qwik-city/buildtime/routing/parse-pathname.ts
function parseRoutePathname(pathname) {
  if (pathname === "/") {
    return {
      pattern: /^\/$/,
      paramNames: [],
      segments: [[{ content: "", dynamic: false, rest: false }]]
    };
  }
  pathname = decodeURIComponent(pathname.slice(1));
  const segments = pathname.split("/");
  const paramNames = [];
  let addTrailingSlash = true;
  const pattern = new RegExp(
    `^${segments.filter((segment) => segment.length > 0).map((segment, i2, segments2) => {
      const catchAll = /^\[\.\.\.(\w+)?\]$/.exec(segment);
      if (catchAll) {
        paramNames.push(catchAll[1]);
        return "(?:/(.*))?";
      }
      const isLast = i2 === segments2.length - 1;
      return "/" + segment.split(DYNAMIC_SEGMENT).map((content, i3) => {
        if (i3 % 2) {
          const rg = PARAM_PATTERN.exec(content);
          if (rg) {
            const [, rest, name] = rg;
            paramNames.push(name);
            return rest ? "(.*?)" : "([^/]+?)";
          }
        }
        if (isLast && content.includes(".")) {
          addTrailingSlash = false;
        }
        return content.normalize().replace(/%5[Bb]/g, "[").replace(/%5[Dd]/g, "]").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }).join("");
    }).join("")}${addTrailingSlash ? "/?" : ""}$`
  );
  return {
    pattern,
    paramNames,
    segments: segments.map((segment) => {
      const parts = [];
      segment.split(/\[(.+?)\]/).map((content, i2) => {
        if (content) {
          const dynamic = !!(i2 % 2);
          parts.push({
            content,
            dynamic,
            rest: dynamic && content.startsWith("...")
          });
        }
      });
      return parts;
    })
  };
}
var PARAM_PATTERN = /^(\.\.\.)?(\w+)?$/;
var DYNAMIC_SEGMENT = /\[(.+?)\]/;

// packages/qwik-city/buildtime/routing/sort-routes.ts
function routeSortCompare(a, b) {
  const maxSegments = Math.max(a.segments.length, b.segments.length);
  for (let i2 = 0; i2 < maxSegments; i2 += 1) {
    const sa = a.segments[i2];
    const sb = b.segments[i2];
    if (!sa) {
      return a.pathname.includes("[...") ? 1 : -1;
    }
    if (!sb) {
      return b.pathname.includes("[...") ? -1 : 1;
    }
    const maxParts = Math.max(sa.length, sb.length);
    for (let i3 = 0; i3 < maxParts; i3 += 1) {
      const pa = sa[i3];
      const pb = sb[i3];
      if (pa === void 0) {
        return pb.dynamic ? -1 : 1;
      }
      if (pb === void 0) {
        return pa.dynamic ? 1 : -1;
      }
      if (pa.dynamic !== pb.dynamic) {
        return pa.dynamic ? 1 : -1;
      }
      if (pa.dynamic) {
        if (pa.rest !== pb.rest) {
          return pa.rest ? 1 : -1;
        }
      }
    }
  }
  if (a.pathname === b.pathname) {
    return a.ext > b.ext ? -1 : 1;
  }
  return a.pathname < b.pathname ? -1 : 1;
}

// packages/qwik-city/buildtime/routing/resolve-source-file.ts
function resolveSourceFiles(opts, sourceFiles) {
  const layouts = sourceFiles.filter((s3) => s3.type === "layout").map((s3) => resolveLayout(opts, s3)).sort((a, b) => {
    return a.id < b.id ? -1 : 1;
  });
  const routes = sourceFiles.filter((s3) => s3.type === "route").map((s3) => resolveRoute(opts, layouts, s3)).sort(routeSortCompare);
  const errors = sourceFiles.filter((s3) => s3.type === "error").map((s3) => resolveError(opts, layouts, s3)).filter((s3) => s3).sort(routeSortCompare);
  const entries = sourceFiles.filter((s3) => s3.type === "entry").map((s3) => resolveEntry(opts, s3)).sort((a, b) => {
    return a.chunkFileName < b.chunkFileName ? -1 : 1;
  });
  const serviceWorkers = sourceFiles.filter((s3) => s3.type === "service-worker").map((p) => resolveServiceWorkerEntry(opts, p)).sort((a, b) => {
    return a.chunkFileName < b.chunkFileName ? -1 : 1;
  });
  const menus = sourceFiles.filter((s3) => s3.type === "menu").map((p) => resolveMenu(opts, p)).sort((a, b) => {
    return a.pathname < b.pathname ? -1 : 1;
  });
  let inc = 0;
  const ids = /* @__PURE__ */ new Set();
  const uniqueIds = (b) => {
    for (const r3 of b) {
      let id = r3.id;
      while (ids.has(id)) {
        id = `${r3.id}_${inc++}`;
      }
      r3.id = id;
      ids.add(id);
    }
  };
  uniqueIds(layouts);
  uniqueIds(routes);
  uniqueIds(errors);
  uniqueIds(entries);
  uniqueIds(serviceWorkers);
  return { layouts, routes, errors, entries, menus, serviceWorkers };
}
function resolveLayout(opts, layoutSourceFile) {
  let extlessName = layoutSourceFile.extlessName;
  const filePath = layoutSourceFile.filePath;
  const dirPath = layoutSourceFile.dirPath;
  let layoutName;
  let layoutType;
  if (extlessName.endsWith(LAYOUT_TOP_SUFFIX)) {
    layoutType = "top";
    extlessName = extlessName.slice(0, extlessName.length - 1);
  } else {
    layoutType = "nested";
  }
  if (extlessName.startsWith(LAYOUT_NAMED_PREFIX)) {
    layoutName = extlessName.slice(LAYOUT_NAMED_PREFIX.length);
  } else {
    layoutName = "";
  }
  const layout = {
    id: createFileId(opts.routesDir, filePath),
    filePath,
    dirPath,
    layoutType,
    layoutName
  };
  return layout;
}
var LAYOUT_ID = "layout";
var LAYOUT_NAMED_PREFIX = LAYOUT_ID + "-";
var LAYOUT_TOP_SUFFIX = "!";
function resolveRoute(opts, appLayouts, sourceFile) {
  const filePath = sourceFile.filePath;
  const layouts = [];
  const routesDir = opts.routesDir;
  const { layoutName, layoutStop } = parseRouteIndexName(sourceFile.extlessName);
  const pathname = getPathnameFromDirPath(opts, sourceFile.dirPath);
  if (!layoutStop) {
    let currentDir = normalizePath((0, import_node_path6.dirname)(filePath));
    let hasFoundNamedLayout = false;
    const hasNamedLayout = layoutName !== "";
    for (let i2 = 0; i2 < 20; i2++) {
      let layout = void 0;
      if (hasNamedLayout && !hasFoundNamedLayout) {
        layout = appLayouts.find((l) => l.dirPath === currentDir && l.layoutName === layoutName);
        if (layout) {
          hasFoundNamedLayout = true;
        }
      } else {
        layout = appLayouts.find((l) => l.dirPath === currentDir && l.layoutName === "");
      }
      if (layout) {
        layouts.push(layout);
        if (layout.layoutType === "top") {
          break;
        }
      }
      if (currentDir === routesDir) {
        break;
      }
      currentDir = normalizePath((0, import_node_path6.dirname)(currentDir));
    }
  }
  const buildRoute = {
    id: createFileId(opts.routesDir, filePath),
    filePath,
    pathname,
    layouts: layouts.reverse(),
    ext: sourceFile.ext,
    ...parseRoutePathname(pathname)
  };
  return buildRoute;
}
function resolveError(opts, appLayouts, sourceFile) {
  return resolveRoute(opts, appLayouts, sourceFile);
}
function resolveEntry(opts, sourceFile) {
  const pathname = getPathnameFromDirPath(opts, sourceFile.dirPath);
  const chunkFileName = pathname.slice(1);
  const buildEntry = {
    id: createFileId(opts.routesDir, sourceFile.filePath),
    filePath: sourceFile.filePath,
    chunkFileName,
    ...parseRoutePathname(pathname)
  };
  return buildEntry;
}
function resolveServiceWorkerEntry(opts, sourceFile) {
  const dirPathname = getPathnameFromDirPath(opts, sourceFile.dirPath);
  const pathname = dirPathname + sourceFile.extlessName + ".js";
  const chunkFileName = pathname.slice(opts.basePathname.length);
  const buildEntry = {
    id: createFileId(opts.routesDir, sourceFile.filePath),
    filePath: sourceFile.filePath,
    chunkFileName,
    ...parseRoutePathname(pathname)
  };
  return buildEntry;
}

// packages/qwik-city/buildtime/build.ts
async function build(ctx) {
  try {
    await updateBuildContext(ctx);
    validateBuild(ctx);
  } catch (e2) {
    addError(ctx, e2);
  }
  for (const d of ctx.diagnostics) {
    if (d.type === "error") {
      throw new Error(d.message);
    } else {
      console.warn(d.message);
    }
  }
}
async function updateBuildContext(ctx) {
  if (!ctx.activeBuild) {
    ctx.activeBuild = new Promise((resolve4, reject) => {
      walkRoutes(ctx.opts.routesDir).then((sourceFiles) => {
        const resolved = resolveSourceFiles(ctx.opts, sourceFiles);
        ctx.layouts = resolved.layouts;
        ctx.routes = resolved.routes;
        ctx.errors = resolved.errors;
        ctx.entries = resolved.entries;
        ctx.serviceWorkers = resolved.serviceWorkers;
        ctx.menus = resolved.menus;
        resolve4();
      }, reject).finally(() => {
        ctx.activeBuild = null;
      });
    });
  }
  return ctx.activeBuild;
}
function validateBuild(ctx) {
  const pathnames = Array.from(new Set(ctx.routes.map((r3) => r3.pathname))).sort();
  for (const pathname of pathnames) {
    const foundRoutes = ctx.routes.filter((r3) => r3.pathname === pathname);
    if (foundRoutes.length > 1) {
      addError(
        ctx,
        `More than one route has been found for pathname "${pathname}". Please narrow it down to only one of these:
${foundRoutes.map((r3) => `  - ${r3.filePath}`).join("\n")}`
      );
    }
  }
}

// packages/qwik-city/buildtime/vite/dev-server.ts
var import_node_fs4 = __toESM(require("fs"), 1);
var import_node_path7 = require("path");

// packages/qwik-city/middleware/request-handler/headers.ts
var HEADERS = Symbol("headers");
var _a;
var HeadersPolyfill = class {
  constructor() {
    this[_a] = {};
  }
  [(_a = HEADERS, Symbol.iterator)]() {
    return this.entries();
  }
  *keys() {
    for (const name of Object.keys(this[HEADERS])) {
      yield name;
    }
  }
  *values() {
    for (const value2 of Object.values(this[HEADERS])) {
      yield value2;
    }
  }
  *entries() {
    for (const name of Object.keys(this[HEADERS])) {
      yield [name, this.get(name)];
    }
  }
  get(name) {
    return this[HEADERS][normalizeHeaderName(name)] || null;
  }
  set(name, value2) {
    const normalizedName = normalizeHeaderName(name);
    this[HEADERS][normalizedName] = typeof value2 !== "string" ? String(value2) : value2;
  }
  append(name, value2) {
    const normalizedName = normalizeHeaderName(name);
    const resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${value2}` : value2;
    this.set(name, resolvedValue);
  }
  delete(name) {
    if (!this.has(name)) {
      return;
    }
    const normalizedName = normalizeHeaderName(name);
    delete this[HEADERS][normalizedName];
  }
  all() {
    return this[HEADERS];
  }
  has(name) {
    return this[HEADERS].hasOwnProperty(normalizeHeaderName(name));
  }
  forEach(callback, thisArg) {
    for (const name in this[HEADERS]) {
      if (this[HEADERS].hasOwnProperty(name)) {
        callback.call(thisArg, this[HEADERS][name], name, this);
      }
    }
  }
};
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") {
    throw new TypeError("Invalid character in header field name");
  }
  return name.toLowerCase();
}
function createHeaders() {
  return new (typeof Headers === "function" ? Headers : HeadersPolyfill)();
}

// packages/qwik-city/middleware/request-handler/redirect-handler.ts
var RedirectResponse = class {
  constructor(url, status, headers) {
    this.url = url;
    this.location = url;
    this.status = isRedirectStatus(status) ? status : 302 /* Found */;
    this.headers = headers || createHeaders();
    this.headers.set("Location", this.location);
    this.headers.delete("Cache-Control");
  }
};
function redirectResponse(requestCtx, responseRedirect) {
  return requestCtx.response(responseRedirect.status, responseRedirect.headers, async () => {
  });
}
function isRedirectStatus(status) {
  return typeof status === "number" && status >= 301 /* MovedPermanently */ && status <= 308 /* PermanentRedirect */;
}

// packages/qwik-city/middleware/request-handler/error-handler.ts
var ErrorResponse = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
function notFoundHandler(requestCtx) {
  return errorResponse(requestCtx, new ErrorResponse(404, "Not Found"));
}
function errorResponse(requestCtx, errorResponse2) {
  const html3 = minimalHtmlResponse(
    errorResponse2.status,
    errorResponse2.message,
    errorResponse2.stack
  );
  const headers = createHeaders();
  headers.set("Content-Type", "text/html; charset=utf-8");
  return requestCtx.response(
    errorResponse2.status,
    headers,
    async (stream) => {
      stream.write(html3);
    },
    errorResponse2
  );
}
function getErrorHtml(status, e2) {
  let message = "Server Error";
  let stack = void 0;
  if (e2 != null) {
    if (typeof e2 === "object") {
      if (typeof e2.message === "string") {
        message = e2.message;
      }
      if (e2.stack != null) {
        stack = String(e2.stack);
      }
    } else {
      message = String(e2);
    }
  }
  return minimalHtmlResponse(status, message, stack);
}
function minimalHtmlResponse(status, message, stack) {
  const width = typeof message === "string" ? "600px" : "300px";
  const color2 = status >= 500 ? COLOR_500 : COLOR_400;
  if (status < 500) {
    stack = "";
  }
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${status}"/>
  <title>${status} ${message}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${color2}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${width}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${color2}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${color2}; color: white; }
    span { display: inline-block; padding: 15px; }
    pre { max-width: 580px; margin: 0 auto; }
  </style>
</head>
<body>
  <p>
    <strong>${status}</strong>
    <span>${message}</span>
  </p>
  ${stack ? `<pre><code>${stack}</code></pre>` : ``}
</body>
</html>
`;
}
var COLOR_400 = "#006ce9";
var COLOR_500 = "#713fc2";

// packages/qwik-city/middleware/request-handler/cookie.ts
var SAMESITE = {
  lax: "Lax",
  none: "None",
  strict: "Strict"
};
var UNIT = {
  seconds: 1,
  minutes: 1 * 60,
  hours: 1 * 60 * 60,
  days: 1 * 60 * 60 * 24,
  weeks: 1 * 60 * 60 * 24 * 7
};
var createSetCookieValue = (cookieName, cookieValue, options2) => {
  const c2 = [`${cookieName}=${cookieValue}`];
  if (typeof options2.domain === "string") {
    c2.push(`Domain=${options2.domain}`);
  }
  if (typeof options2.maxAge === "number") {
    c2.push(`Max-Age=${options2.maxAge}`);
  } else if (Array.isArray(options2.maxAge)) {
    c2.push(`Max-Age=${options2.maxAge[0] * UNIT[options2.maxAge[1]]}`);
  } else if (typeof options2.expires === "number" || typeof options2.expires == "string") {
    c2.push(`Expires=${options2.expires}`);
  } else if (options2.expires instanceof Date) {
    c2.push(`Expires=${options2.expires.toUTCString()}`);
  }
  if (options2.httpOnly) {
    c2.push("HttpOnly");
  }
  if (typeof options2.path === "string") {
    c2.push(`Path=${options2.path}`);
  }
  if (options2.sameSite && SAMESITE[options2.sameSite]) {
    c2.push(`SameSite=${SAMESITE[options2.sameSite]}`);
  }
  if (options2.secure) {
    c2.push("Secure");
  }
  return c2.join("; ");
};
var parseCookieString = (cookieString) => {
  const cookie = {};
  if (typeof cookieString === "string" && cookieString !== "") {
    const cookieSegments = cookieString.split(";");
    for (const cookieSegment of cookieSegments) {
      const cookieSplit = cookieSegment.split("=");
      if (cookieSplit.length > 1) {
        const cookieName = decodeURIComponent(cookieSplit[0].trim());
        const cookieValue = decodeURIComponent(cookieSplit[1].trim());
        cookie[cookieName] = cookieValue;
      }
    }
  }
  return cookie;
};
var REQ_COOKIE = Symbol("request-cookies");
var RES_COOKIE = Symbol("response-cookies");
var _a2;
var Cookie = class {
  constructor(cookieString) {
    this[_a2] = {};
    this[REQ_COOKIE] = parseCookieString(cookieString);
  }
  get(cookieName) {
    const value2 = this[REQ_COOKIE][cookieName];
    if (!value2) {
      return null;
    }
    return {
      value: value2,
      json() {
        return JSON.parse(value2);
      },
      number() {
        return Number(value2);
      }
    };
  }
  has(cookieName) {
    return !!this[REQ_COOKIE][cookieName];
  }
  set(cookieName, cookieValue, options2 = {}) {
    const resolvedValue = typeof cookieValue === "string" ? cookieValue : encodeURIComponent(JSON.stringify(cookieValue));
    this[RES_COOKIE][cookieName] = createSetCookieValue(cookieName, resolvedValue, options2);
  }
  delete(name, options2) {
    this.set(name, "deleted", { ...options2, expires: new Date(0) });
  }
  headers() {
    return Object.values(this[RES_COOKIE]);
  }
};
REQ_COOKIE, _a2 = RES_COOKIE;

// packages/qwik-city/middleware/request-handler/user-response.ts
async function loadUserResponse(requestCtx, params, routeModules, trailingSlash, basePathname = "/") {
  if (routeModules.length === 0) {
    throw new ErrorResponse(404 /* NotFound */, `Not Found`);
  }
  const { request, url, platform } = requestCtx;
  const { pathname } = url;
  const isPageModule = isLastModulePageRoute(routeModules);
  const isPageDataRequest = isPageModule && request.headers.get("Accept") === "application/json";
  const type = isPageDataRequest ? "pagedata" : isPageModule ? "pagehtml" : "endpoint";
  const userResponse = {
    type,
    url,
    params,
    status: 200 /* Ok */,
    headers: createHeaders(),
    resolvedBody: void 0,
    pendingBody: void 0,
    cookie: new Cookie(request.headers.get("cookie")),
    aborted: false
  };
  let hasRequestMethodHandler = false;
  if (isPageModule && pathname !== basePathname) {
    if (trailingSlash) {
      if (!pathname.endsWith("/")) {
        throw new RedirectResponse(pathname + "/" + url.search, 302 /* Found */);
      }
    } else {
      if (pathname.endsWith("/")) {
        throw new RedirectResponse(
          pathname.slice(0, pathname.length - 1) + url.search,
          302 /* Found */
        );
      }
    }
  }
  let routeModuleIndex = -1;
  const abort = () => {
    routeModuleIndex = ABORT_INDEX;
  };
  const redirect = (url2, status) => {
    return new RedirectResponse(url2, status, userResponse.headers);
  };
  const error = (status, message) => {
    return new ErrorResponse(status, message);
  };
  const next = async () => {
    routeModuleIndex++;
    while (routeModuleIndex < routeModules.length) {
      const endpointModule = routeModules[routeModuleIndex];
      let reqHandler = void 0;
      switch (request.method) {
        case "GET": {
          reqHandler = endpointModule.onGet;
          break;
        }
        case "POST": {
          reqHandler = endpointModule.onPost;
          break;
        }
        case "PUT": {
          reqHandler = endpointModule.onPut;
          break;
        }
        case "PATCH": {
          reqHandler = endpointModule.onPatch;
          break;
        }
        case "OPTIONS": {
          reqHandler = endpointModule.onOptions;
          break;
        }
        case "HEAD": {
          reqHandler = endpointModule.onHead;
          break;
        }
        case "DELETE": {
          reqHandler = endpointModule.onDelete;
          break;
        }
      }
      reqHandler = reqHandler || endpointModule.onRequest;
      if (typeof reqHandler === "function") {
        hasRequestMethodHandler = true;
        const response = {
          get status() {
            return userResponse.status;
          },
          set status(code2) {
            userResponse.status = code2;
          },
          get headers() {
            return userResponse.headers;
          },
          get locale() {
            return requestCtx.locale;
          },
          set locale(locale) {
            requestCtx.locale = locale;
          },
          redirect,
          error
        };
        const requestEv = {
          request,
          url: new URL(url),
          params: { ...params },
          response,
          platform,
          cookie: userResponse.cookie,
          next,
          abort
        };
        const syncData = reqHandler(requestEv);
        if (typeof syncData === "function") {
          userResponse.pendingBody = createPendingBody(syncData);
        } else if (syncData !== null && typeof syncData === "object" && typeof syncData.then === "function") {
          const asyncResolved = await syncData;
          if (typeof asyncResolved === "function") {
            userResponse.pendingBody = createPendingBody(asyncResolved);
          } else {
            userResponse.resolvedBody = asyncResolved;
          }
        } else {
          userResponse.resolvedBody = syncData;
        }
      }
      routeModuleIndex++;
    }
  };
  await next();
  userResponse.aborted = routeModuleIndex >= ABORT_INDEX;
  for (const setCookieValue of userResponse.cookie.headers()) {
    userResponse.headers.set("Set-Cookie", setCookieValue);
  }
  if (!isPageDataRequest && isRedirectStatus(userResponse.status) && userResponse.headers.has("Location")) {
    throw new RedirectResponse(
      userResponse.headers.get("Location"),
      userResponse.status,
      userResponse.headers
    );
  }
  if (type === "endpoint" && !hasRequestMethodHandler) {
    throw new ErrorResponse(405 /* MethodNotAllowed */, `Method Not Allowed`);
  }
  return userResponse;
}
function createPendingBody(cb) {
  return new Promise((resolve4, reject) => {
    try {
      const rtn = cb();
      if (rtn !== null && typeof rtn === "object" && typeof rtn.then === "function") {
        rtn.then(resolve4, reject);
      } else {
        resolve4(rtn);
      }
    } catch (e2) {
      reject(e2);
    }
  });
}
function isLastModulePageRoute(routeModules) {
  const lastRouteModule = routeModules[routeModules.length - 1];
  return lastRouteModule && typeof lastRouteModule.default === "function";
}
function updateRequestCtx(requestCtx, trailingSlash) {
  let pathname = requestCtx.url.pathname;
  if (pathname.endsWith(QDATA_JSON)) {
    requestCtx.request.headers.set("Accept", "application/json");
    const trimEnd = pathname.length - QDATA_JSON_LEN + (trailingSlash ? 1 : 0);
    pathname = pathname.slice(0, trimEnd);
    if (pathname === "") {
      pathname = "/";
    }
    requestCtx.url.pathname = pathname;
  }
}
var QDATA_JSON = "/q-data.json";
var QDATA_JSON_LEN = QDATA_JSON.length;
var ABORT_INDEX = 999999999;

// packages/qwik-city/middleware/request-handler/page-handler.ts
function pageHandler(mode, requestCtx, userResponse, render, opts, routeBundleNames) {
  const { status, headers } = userResponse;
  const { response } = requestCtx;
  const isPageData = userResponse.type === "pagedata";
  const requestHeaders = {};
  requestCtx.request.headers.forEach((value2, key) => requestHeaders[key] = value2);
  if (isPageData) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }
  return response(isPageData ? 200 : status, headers, async (stream) => {
    try {
      const result = await render({
        stream: isPageData ? noopStream : stream,
        envData: getQwikCityEnvData(requestHeaders, userResponse, requestCtx.locale, mode),
        ...opts
      });
      if (isPageData) {
        stream.write(
          JSON.stringify(await getClientPageData(userResponse, result, routeBundleNames))
        );
      } else {
        if ((typeof result).html === "string") {
          stream.write(result.html);
        }
      }
      if (typeof stream.clientData === "function") {
        stream.clientData(await getClientPageData(userResponse, result, routeBundleNames));
      }
    } catch (e2) {
      const errorHtml = getErrorHtml(500 /* InternalServerError */, e2);
      stream.write(errorHtml);
    }
  });
}
async function getClientPageData(userResponse, result, routeBundleNames) {
  var _a6;
  const prefetchBundleNames = getPrefetchBundleNames(result, routeBundleNames);
  const isStatic = !((_a6 = result.snapshotResult) == null ? void 0 : _a6.resources.some((r3) => r3._cache !== Infinity));
  const clientPage = {
    body: userResponse.pendingBody ? await userResponse.pendingBody : userResponse.resolvedBody,
    status: userResponse.status !== 200 ? userResponse.status : void 0,
    redirect: userResponse.status >= 301 && userResponse.status <= 308 && userResponse.headers.get("location") || void 0,
    isStatic,
    prefetch: prefetchBundleNames.length > 0 ? prefetchBundleNames : void 0
  };
  return clientPage;
}
function getPrefetchBundleNames(result, routeBundleNames) {
  const bundleNames = [];
  const addBundle = (bundleName) => {
    if (bundleName && !bundleNames.includes(bundleName)) {
      bundleNames.push(bundleName);
    }
  };
  const addPrefetchResource = (prefetchResources) => {
    if (Array.isArray(prefetchResources)) {
      for (const prefetchResource of prefetchResources) {
        const bundleName = prefetchResource.url.split("/").pop();
        if (bundleName && !bundleNames.includes(bundleName)) {
          addBundle(bundleName);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(result.prefetchResources);
  const manifest = result.manifest || result._manifest;
  const renderedSymbols = result._symbols;
  if (manifest && renderedSymbols) {
    for (const renderedSymbolName of renderedSymbols) {
      const symbol = manifest.symbols[renderedSymbolName];
      if (symbol && symbol.ctxName === "component$") {
        addBundle(manifest.mapping[renderedSymbolName]);
      }
    }
  }
  if (routeBundleNames) {
    for (const routeBundleName of routeBundleNames) {
      addBundle(routeBundleName);
    }
  }
  return bundleNames;
}
function getQwikCityEnvData(requestHeaders, userResponse, locale, mode) {
  const { url, params, pendingBody, resolvedBody, status } = userResponse;
  return {
    url: url.href,
    requestHeaders,
    locale,
    qwikcity: {
      mode,
      params: { ...params },
      response: {
        body: pendingBody || resolvedBody,
        status
      }
    }
  };
}
var noopStream = { write: () => {
} };

// packages/qwik-city/middleware/request-handler/endpoint-handler.ts
function endpointHandler(requestCtx, userResponse) {
  const { pendingBody, resolvedBody, status, headers } = userResponse;
  const { response } = requestCtx;
  if (pendingBody === void 0 && resolvedBody === void 0) {
    return response(status, headers, asyncNoop);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  const isJson = headers.get("Content-Type").includes("json");
  return response(status, headers, async ({ write }) => {
    const body = pendingBody !== void 0 ? await pendingBody : resolvedBody;
    if (body !== void 0) {
      if (isJson) {
        write(JSON.stringify(body));
      } else {
        const type = typeof body;
        if (type === "string") {
          write(body);
        } else if (type === "number" || type === "boolean") {
          write(String(body));
        } else {
          write(body);
        }
      }
    }
  });
}
var asyncNoop = async () => {
};

// packages/qwik-city/runtime/src/library/routing.ts
var getRouteParams = (paramNames, match) => {
  const params = {};
  if (paramNames) {
    for (let i2 = 0; i2 < paramNames.length; i2++) {
      params[paramNames[i2]] = match ? match[i2 + 1] : "";
    }
  }
  return params;
};

// packages/qwik-city/middleware/node/http.ts
function fromNodeHttp(url, req, res) {
  const requestHeaders = createHeaders();
  const nodeRequestHeaders = req.headers;
  for (const key in nodeRequestHeaders) {
    const value2 = nodeRequestHeaders[key];
    if (typeof value2 === "string") {
      requestHeaders.set(key, value2);
    } else if (Array.isArray(value2)) {
      for (const v of value2) {
        requestHeaders.append(key, v);
      }
    }
  }
  const getRequestBody = async () => {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    return Buffer.concat(buffers).toString();
  };
  const requestCtx = {
    request: {
      headers: requestHeaders,
      formData: async () => {
        return new URLSearchParams(await getRequestBody());
      },
      json: async () => {
        return JSON.parse(await getRequestBody());
      },
      method: req.method || "GET",
      text: getRequestBody,
      url: url.href
    },
    response: async (status, headers, body) => {
      res.statusCode = status;
      headers.forEach((value2, key) => res.setHeader(key, value2));
      body({
        write: (chunk) => {
          res.write;
          res.write(chunk);
        }
      }).finally(() => {
        res.end();
      });
      return res;
    },
    url,
    platform: {
      ssr: true,
      node: process.versions.node
    },
    locale: void 0
  };
  return requestCtx;
}

// packages/qwik-city/buildtime/vite/dev-server.ts
function ssrDevMiddleware(ctx, server) {
  const matchRouteRequest = (pathname) => {
    for (const route of ctx.routes) {
      const match = route.pattern.exec(pathname);
      if (match) {
        return {
          route,
          params: getRouteParams(route.paramNames, match)
        };
      }
    }
    if (ctx.opts.trailingSlash && !pathname.endsWith("/")) {
      const pathnameWithSlash = pathname + "/";
      for (const route of ctx.routes) {
        const match = route.pattern.exec(pathnameWithSlash);
        if (match) {
          return {
            route,
            params: getRouteParams(route.paramNames, match)
          };
        }
      }
    }
    return null;
  };
  return async (req, res, next) => {
    try {
      const url = new URL(req.originalUrl, `http://${req.headers.host}`);
      const requestHeaders = req.headers;
      if (skipRequest(url.pathname) || isVitePing(url.pathname, req.headers)) {
        next();
        return;
      }
      const requestCtx = fromNodeHttp(url, req, res);
      updateRequestCtx(requestCtx, ctx.opts.trailingSlash);
      await updateBuildContext(ctx);
      for (const d of ctx.diagnostics) {
        if (d.type === "error") {
          console.error(d.message);
        } else {
          console.warn(d.message);
        }
      }
      const routeResult = matchRouteRequest(requestCtx.url.pathname);
      if (routeResult) {
        const { route, params } = routeResult;
        const routeModules = [];
        for (const layout of route.layouts) {
          const layoutModule = await server.ssrLoadModule(layout.filePath, {
            fixStacktrace: true
          });
          routeModules.push(layoutModule);
        }
        const endpointModule = await server.ssrLoadModule(route.filePath, {
          fixStacktrace: true
        });
        routeModules.push(endpointModule);
        try {
          const userResponse = await loadUserResponse(
            requestCtx,
            params,
            routeModules,
            ctx.opts.trailingSlash,
            ctx.opts.basePathname
          );
          if (userResponse.type === "pagedata") {
            await pageHandler("dev", requestCtx, userResponse, noopDevRender);
            return;
          }
          if (userResponse.type === "endpoint") {
            await endpointHandler(requestCtx, userResponse);
            return;
          }
          const envData = getQwikCityEnvData(
            requestHeaders,
            userResponse,
            requestCtx.locale,
            "dev"
          );
          if (ctx.isDevServerClientOnly) {
            envData.qwikcity.response.body = void 0;
          }
          res._qwikEnvData = {
            ...res._qwikEnvData,
            ...envData
          };
          res.statusCode = userResponse.status;
          userResponse.headers.forEach((value2, key) => res.setHeader(key, value2));
          for (const header in userResponse.cookie.headers()) {
            res.setHeader("Set-Cookie", header);
          }
          next();
          return;
        } catch (e2) {
          if (e2 instanceof RedirectResponse) {
            redirectResponse(requestCtx, e2);
          } else if (e2 instanceof ErrorResponse) {
            errorResponse(requestCtx, e2);
          } else {
            next(e2);
          }
          return;
        }
      } else {
        for (const sw of ctx.serviceWorkers) {
          const match = sw.pattern.exec(requestCtx.url.pathname);
          if (match) {
            res.setHeader("Content-Type", "text/javascript");
            res.end(DEV_SERVICE_WORKER);
            return;
          }
        }
      }
      const ext = getExtension(requestCtx.url.pathname);
      if (STATIC_CONTENT_TYPES[ext]) {
        next();
        return;
      }
      if (req.headers.accept && req.headers.accept.includes("text/html")) {
        notFoundHandler(requestCtx);
        return;
      }
      next();
    } catch (e2) {
      next(e2);
    }
  };
}
function dev404Middleware() {
  return async (req, res, next) => {
    try {
      const url = new URL(req.originalUrl, `http://${req.headers.host}`);
      const requestCtx = fromNodeHttp(url, req, res);
      await notFoundHandler(requestCtx);
    } catch (e2) {
      next(e2);
    }
  };
}
function staticDistMiddleware({ config }) {
  const distDirs = new Set(
    ["dist", config.build.outDir, config.publicDir].map(
      (d) => normalizePath((0, import_node_path7.resolve)(config.root, d))
    )
  );
  return async (req, res, next) => {
    const url = new URL(req.originalUrl, `http://${req.headers.host}`);
    if (skipRequest(url.pathname)) {
      next();
      return;
    }
    const relPath = url.pathname.slice(1);
    const ext = getExtension(relPath);
    const contentType = STATIC_CONTENT_TYPES[ext];
    if (!contentType) {
      next();
      return;
    }
    for (const distDir of distDirs) {
      try {
        const filePath = (0, import_node_path7.join)(distDir, relPath);
        const s3 = await import_node_fs4.default.promises.stat(filePath);
        if (s3.isFile()) {
          res.writeHead(200, {
            "Content-Type": contentType,
            "X-Source-Path": filePath
          });
          import_node_fs4.default.createReadStream(filePath).pipe(res);
          return;
        }
      } catch (e2) {
      }
    }
    next();
  };
}
async function noopDevRender() {
  const result = {
    html: "",
    timing: {
      render: 0,
      snapshot: 0
    },
    prefetchResources: [],
    snapshotResult: null
  };
  return result;
}
var FS_PREFIX = `/@fs/`;
var VALID_ID_PREFIX = `/@id/`;
var VITE_PUBLIC_PATH = `/@vite/`;
var internalPrefixes = [FS_PREFIX, VALID_ID_PREFIX, VITE_PUBLIC_PATH];
var InternalPrefixRE = new RegExp(`^(?:${internalPrefixes.join("|")})`);
function skipRequest(pathname) {
  if (pathname.includes("__open-in-editor") || InternalPrefixRE.test(pathname)) {
    return true;
  }
  if (pathname.includes("favicon")) {
    return true;
  }
  if (pathname.startsWith("/src/")) {
    const ext = getExtension(pathname);
    if (SKIP_SRC_EXTS[ext]) {
      return true;
    }
  }
  return false;
}
function isVitePing(url, headers) {
  return url === "/" && headers.accept === "*/*" && headers["sec-fetch-mode"] === "no-cors";
}
var SKIP_SRC_EXTS = {
  ".tsx": true,
  ".ts": true,
  ".jsx": true,
  ".js": true,
  ".md": true,
  ".mdx": true,
  ".css": true,
  ".scss": true,
  ".sass": true
};
var STATIC_CONTENT_TYPES = {
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".html": "text/html",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};
var DEV_SERVICE_WORKER = `/* Qwik City Dev Service Worker */
addEventListener('install', () => self.skipWaiting());
addEventListener('activate', () => self.clients.claim());
`;

// packages/qwik-city/utils/strip-server-endpoints.ts
var import_typescript3 = __toESM(require("typescript"), 1);
function stripServerEndpoints(code2, id) {
  var _a6;
  let didModify = false;
  const sourceFile = import_typescript3.default.createSourceFile(id, code2, import_typescript3.default.ScriptTarget.Latest);
  for (const s3 of sourceFile.statements) {
    if (!import_typescript3.default.isVariableStatement(s3)) {
      continue;
    }
    if (!((_a6 = s3.modifiers) == null ? void 0 : _a6.some((m2) => m2.kind === import_typescript3.default.SyntaxKind.ExportKeyword))) {
      continue;
    }
    const decs = s3.declarationList.declarations;
    for (const d of decs) {
      if (!import_typescript3.default.isVariableDeclaration(d)) {
        continue;
      }
      const identifier = d.name;
      if (!import_typescript3.default.isIdentifier(identifier)) {
        continue;
      }
      if (!SERVER_ENDPOINT_FNS.some((fn) => identifier.escapedText === fn)) {
        continue;
      }
      d.initializer = import_typescript3.default.factory.createNull();
      didModify = true;
    }
  }
  if (didModify) {
    const printer = import_typescript3.default.createPrinter({ newLine: import_typescript3.default.NewLineKind.LineFeed });
    return printer.printFile(sourceFile);
  }
  return null;
}
var SERVER_ENDPOINT_FNS = ["onGet", "onPost", "onPut", "onRequest"];

// node_modules/node-fetch/src/index.js
var import_node_http2 = __toESM(require("http"), 1);
var import_node_https = __toESM(require("https"), 1);
var import_node_zlib = __toESM(require("zlib"), 1);
var import_node_stream2 = __toESM(require("stream"), 1);
var import_node_buffer2 = require("buffer");

// node_modules/node-fetch/node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default = dataUriToBuffer;

// node_modules/node-fetch/src/body.js
var import_node_stream = __toESM(require("stream"), 1);
var import_node_util = require("util");
var import_node_buffer = require("buffer");
init_fetch_blob();
init_esm_min();

// node_modules/node-fetch/src/errors/base.js
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};

// node_modules/node-fetch/src/errors/fetch-error.js
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};

// node_modules/node-fetch/src/utils/is.js
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var isDomainOrSubdomain = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
var isSameProtocol = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};

// node_modules/node-fetch/src/body.js
var pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
var INTERNALS = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = import_node_buffer.Buffer.from(body.toString());
    } else if (isBlob(body)) {
    } else if (import_node_buffer.Buffer.isBuffer(body)) {
    } else if (import_node_util.types.isAnyArrayBuffer(body)) {
      body = import_node_buffer.Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_node_stream.default) {
    } else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = import_node_buffer.Buffer.from(String(body));
    }
    let stream = body;
    if (import_node_buffer.Buffer.isBuffer(body)) {
      stream = import_node_stream.default.Readable.from(body);
    } else if (isBlob(body)) {
      stream = import_node_stream.default.Readable.from(body.stream());
    }
    this[INTERNALS] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_node_stream.default) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS].stream;
  }
  get bodyUsed() {
    return this[INTERNALS].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value2] of parameters) {
        formData.append(name, value2);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
    return toFormData2(this.body, ct);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
    const buf = await this.arrayBuffer();
    return new fetch_blob_default([buf], {
      type: ct
    });
  }
  async json() {
    const text2 = await this.text();
    return JSON.parse(text2);
  }
  async text() {
    const buffer = await consumeBody(this);
    return new TextDecoder().decode(buffer);
  }
  buffer() {
    return consumeBody(this);
  }
};
Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: (0, import_node_util.deprecate)(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c2) => typeof c2 === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance[INTERNALS];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_node_stream.PassThrough({ highWaterMark });
    p2 = new import_node_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS].stream = p1;
    body = p2;
  }
  return body;
};
var getNonSpecFormDataBoundary = (0, import_node_util.deprecate)(
  (body) => body.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
);
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
  }
  if (body instanceof import_node_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request[INTERNALS];
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (import_node_buffer.Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
var writeToStream = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline(body, dest);
  }
};

// node_modules/node-fetch/src/headers.js
var import_node_util2 = require("util");
var import_node_http = __toESM(require("http"), 1);
var validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
var validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value2) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value2)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
var Headers2 = class extends URLSearchParams {
  constructor(init) {
    let result = [];
    if (init instanceof Headers2) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value2) => [name, value2]));
      }
    } else if (init == null) {
    } else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value2]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value2));
      return [String(name).toLowerCase(), String(value2)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value2) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value2));
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase(),
                String(value2)
              );
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase()
              );
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value2 = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value2 = value2.toLowerCase();
    }
    return value2;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(
  Headers2.prototype,
  ["get", "entries", "forEach", "values"].reduce((result, property) => {
    result[property] = { enumerable: true };
    return result;
  }, {})
);
function fromRawHeaders(headers = []) {
  return new Headers2(
    headers.reduce((result, value2, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []).filter(([name, value2]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value2));
        return true;
      } catch {
        return false;
      }
    })
  );
}

// node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var isRedirect = (code2) => {
  return redirectStatus.has(code2);
};

// node_modules/node-fetch/src/response.js
var INTERNALS2 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status != null ? options2.status : 200;
    const headers = new Headers2(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS2] = {
      type: "default",
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS2].type;
  }
  get url() {
    return this[INTERNALS2].url || "";
  }
  get status() {
    return this[INTERNALS2].status;
  }
  get ok() {
    return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
  }
  get redirected() {
    return this[INTERNALS2].counter > 0;
  }
  get statusText() {
    return this[INTERNALS2].statusText;
  }
  get headers() {
    return this[INTERNALS2].headers;
  }
  get highWaterMark() {
    return this[INTERNALS2].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS2].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});

// node_modules/node-fetch/src/request.js
var import_node_url = require("url");
var import_node_util3 = require("util");

// node_modules/node-fetch/src/utils/get-search.js
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};

// node_modules/node-fetch/src/utils/referrer.js
var import_node_net = require("net");
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
var ReferrerPolicy = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
var DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}

// node_modules/node-fetch/src/request.js
var INTERNALS3 = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS3] === "object";
};
var doBadDataWarn = (0, import_node_util3.deprecate)(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
var Request = class extends Body {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest(init) && "data" in init) {
      doBadDataWarn();
    }
    if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers2(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS3] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  get method() {
    return this[INTERNALS3].method;
  }
  get url() {
    return (0, import_node_url.format)(this[INTERNALS3].parsedURL);
  }
  get headers() {
    return this[INTERNALS3].headers;
  }
  get redirect() {
    return this[INTERNALS3].redirect;
  }
  get signal() {
    return this[INTERNALS3].signal;
  }
  get referrer() {
    if (this[INTERNALS3].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS3].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS3].referrer) {
      return this[INTERNALS3].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS3].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS3];
  const headers = new Headers2(request[INTERNALS3].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS3].referrer = determineRequestsReferrer(request);
  } else {
    request[INTERNALS3].referrer = "no-referrer";
  }
  if (request[INTERNALS3].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search2 = getSearch(parsedURL);
  const options2 = {
    path: parsedURL.pathname + search2,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    parsedURL,
    options: options2
  };
};

// node_modules/node-fetch/src/errors/abort-error.js
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};

// node_modules/node-fetch/src/index.js
init_esm_min();
init_from();
var supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve4, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options: options2 } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve4(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve4(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve4(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve4(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve4(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve4(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve4(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve4(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer2.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = import_node_buffer2.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer2.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer2.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}

// packages/qwik-city/middleware/node/node-fetch.ts
function patchGlobalFetch() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    if (!globalThis.fetch) {
      globalThis.fetch = fetch;
      globalThis.Headers = Headers2;
      globalThis.Request = Request;
      globalThis.Response = Response;
    }
  }
}

// packages/qwik-city/buildtime/vite/plugin.ts
var import_node_fs6 = __toESM(require("fs"), 1);

// sw-reg:@qwik-city-sw-register-build
var qwik_city_sw_register_build_default = '((s,a,i,r)=>{i=(e,t)=>{t=document.querySelector("[q\\\\:base]"),t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},document.addEventListener("qprefetch",e=>{const t=e.detail;a?i(t):t.bundles&&s.push(...t.bundles)}),navigator.serviceWorker.register("__url").then(e=>{r=()=>{a=e,i({bundles:s})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&r()}):e.active&&r()}).catch(e=>console.error(e))})([])';

// packages/qwik-city/buildtime/runtime-generation/generate-service-worker.ts
function generateServiceWorkerRegister(ctx) {
  let swReg;
  if (ctx.isDevServer) {
    swReg = SW_UNREGISTER;
  } else {
    swReg = qwik_city_sw_register_build_default;
    let swUrl = "/service-worker.js";
    if (ctx.serviceWorkers.length > 0) {
      const sw = ctx.serviceWorkers.sort(
        (a, b) => a.chunkFileName.length < b.chunkFileName.length ? -1 : 1
      )[0];
      swUrl = ctx.opts.basePathname + sw.chunkFileName;
    }
    swReg = swReg.replace("__url", swUrl);
  }
  return `export default ${JSON.stringify(swReg)};`;
}
function prependManifestToServiceWorker(ctx, manifest, swCode) {
  const key = `/* Qwik Service Worker */`;
  if (swCode.includes(key)) {
    return null;
  }
  const appBundles = [];
  const appBundlesCode = generateAppBundles(appBundles, manifest);
  const libraryBundlesCode = generateLibraryBundles(appBundles, manifest);
  const linkBundlesCode = generateLinkBundles(ctx, appBundles, manifest);
  return [key, appBundlesCode, libraryBundlesCode, linkBundlesCode, swCode].join("\n");
}
function generateAppBundles(appBundles, manifest) {
  for (const appBundleName in manifest.bundles) {
    appBundles.push([appBundleName, []]);
  }
  for (const appBundle of appBundles) {
    const appBundleName = appBundle[0];
    const importedBundleIds = appBundle[1];
    const symbolHashesInBundle = [];
    const manifestBundle = manifest.bundles[appBundleName];
    const importedBundleNames = Array.isArray(manifestBundle.imports) ? manifestBundle.imports : [];
    for (const importedBundleName of importedBundleNames) {
      importedBundleIds.push(getAppBundleId(appBundles, importedBundleName));
    }
    if (manifestBundle.symbols) {
      for (const manifestBundleSymbolName of manifestBundle.symbols) {
        const symbol = manifest.symbols[manifestBundleSymbolName];
        if ((symbol == null ? void 0 : symbol.hash) && !symbolHashesInBundle.includes(symbol.hash)) {
          symbolHashesInBundle.push(symbol.hash);
        }
      }
    }
    if (symbolHashesInBundle.length > 0) {
      appBundle[2] = symbolHashesInBundle;
    }
  }
  return `const appBundles=${JSON.stringify(appBundles)};`;
}
function generateLibraryBundles(appBundles, manifest) {
  const libraryBundleIds = [];
  for (const [bundleName, bundle] of Object.entries(manifest.bundles)) {
    if (bundle.origins && bundle.origins.includes("@qwik-city-plan")) {
      libraryBundleIds.push(getAppBundleId(appBundles, bundleName));
      break;
    }
  }
  return `const libraryBundleIds=${JSON.stringify(libraryBundleIds)};`;
}
function generateLinkBundles(ctx, appBundles, manifest) {
  const linkBundles = [];
  for (const r3 of ctx.routes) {
    const linkBundleNames = [];
    const addFileBundles = (filePath) => {
      for (const [bundleName, bundle] of Object.entries(manifest.bundles)) {
        if (bundle.origins) {
          for (const bundleOrigin of bundle.origins) {
            const srcPath = removeExtension(filePath);
            const bundleOrginPath = removeExtension(bundleOrigin);
            if (srcPath.endsWith(bundleOrginPath)) {
              if (!linkBundleNames.includes(bundleName)) {
                linkBundleNames.push(bundleName);
              }
              if (bundle.dynamicImports) {
                for (const dynamicImport of bundle.dynamicImports) {
                  if (!linkBundleNames.includes(dynamicImport)) {
                    linkBundleNames.push(dynamicImport);
                  }
                }
              }
            }
          }
        }
      }
    };
    for (const layout of r3.layouts) {
      addFileBundles(layout.filePath);
    }
    addFileBundles(r3.filePath);
    linkBundles.push(
      `[${r3.pattern.toString()},${JSON.stringify(
        linkBundleNames.map((bundleName) => getAppBundleId(appBundles, bundleName))
      )}]`
    );
  }
  return `const linkBundles=[${linkBundles.join(",")}];`;
}
function getAppBundleId(appBundles, bundleName) {
  return appBundles.findIndex((b) => b[0] === bundleName);
}
var SW_UNREGISTER = `
navigator.serviceWorker.getRegistrations().then((regs) => {
  for (const reg of regs) {
    reg.unregister();
  }
});
`;

// packages/qwik-city/buildtime/vite/plugin.ts
function qwikCity(userOpts) {
  patchGlobalFetch();
  let ctx = null;
  let mdxTransform = null;
  let rootDir = null;
  let qwikPlugin;
  const api = {
    getRoutes: () => {
      return (ctx == null ? void 0 : ctx.routes.slice()) ?? [];
    },
    getServiceWorkers: () => {
      return (ctx == null ? void 0 : ctx.serviceWorkers.slice()) ?? [];
    }
  };
  const plugin = {
    name: "vite-plugin-qwik-city",
    enforce: "pre",
    api,
    config() {
      const updatedViteConfig = {
        appType: "custom",
        base: userOpts == null ? void 0 : userOpts.basePathname,
        optimizeDeps: {
          exclude: [QWIK_CITY, QWIK_CITY_PLAN_ID, QWIK_CITY_ENTRIES_ID, QWIK_CITY_SW_REGISTER]
        },
        ssr: {
          noExternal: [QWIK_CITY, QWIK_CITY_PLAN_ID, QWIK_CITY_ENTRIES_ID, QWIK_CITY_SW_REGISTER]
        }
      };
      return updatedViteConfig;
    },
    async configResolved(config) {
      var _a6;
      rootDir = (0, import_node_path8.resolve)(config.root);
      const target = ((_a6 = config.build) == null ? void 0 : _a6.ssr) || config.mode === "ssr" ? "ssr" : "client";
      ctx = createBuildContext(rootDir, userOpts, target);
      ctx.isDevServer = config.command === "serve";
      ctx.isDevServerClientOnly = ctx.isDevServer && config.mode !== "ssr";
      await validatePlugin(ctx.opts);
      mdxTransform = await createMdxTransformer(ctx);
      qwikPlugin = config.plugins.find((p) => p.name === "vite-plugin-qwik");
      if (!qwikPlugin) {
        throw new Error("Missing vite-plugin-qwik");
      }
    },
    configureServer(server) {
      if (ctx) {
        server.middlewares.use(ssrDevMiddleware(ctx, server));
        server.middlewares.use(staticDistMiddleware(server));
      }
      return () => {
        server.middlewares.use(dev404Middleware());
      };
    },
    buildStart() {
      resetBuildContext(ctx);
    },
    resolveId(id) {
      if (id === QWIK_CITY_PLAN_ID || id === QWIK_CITY_ENTRIES_ID || id === QWIK_CITY_SW_REGISTER) {
        return (0, import_node_path8.join)(rootDir, id);
      }
      return null;
    },
    async load(id) {
      if (ctx) {
        if (id.endsWith(QWIK_CITY_ENTRIES_ID)) {
          return generateQwikCityEntries(ctx);
        }
        const isCityPlan = id.endsWith(QWIK_CITY_PLAN_ID);
        const isSwRegister = id.endsWith(QWIK_CITY_SW_REGISTER);
        if (isCityPlan || isSwRegister) {
          if (!ctx.isDevServer && ctx.isDirty) {
            await build(ctx);
            ctx.isDirty = false;
            ctx.diagnostics.forEach((d) => {
              this.warn(d.message);
            });
          }
          if (isCityPlan) {
            return generateQwikCityPlan(ctx, qwikPlugin);
          }
          if (isSwRegister) {
            return generateServiceWorkerRegister(ctx);
          }
        }
      }
      return null;
    },
    async transform(code2, id) {
      if (ctx) {
        const fileName = (0, import_node_path8.basename)(id);
        if (isMenuFileName(fileName)) {
          const menuCode = await transformMenu(ctx.opts, id, code2);
          return menuCode;
        }
        const ext = getExtension(fileName);
        if (isMarkdownExt(ext) && mdxTransform) {
          try {
            const mdxResult = await mdxTransform(code2, id);
            return mdxResult;
          } catch (e2) {
            const column = e2.position.start.column;
            const line = e2.position.start.line;
            const err = Object.assign(new Error(e2.reason), {
              id,
              plugin: "qwik-city-mdx",
              loc: {
                column,
                line
              },
              stack: ""
            });
            this.error(err);
          }
        }
        if (ctx.target === "client") {
          if (ext === ".js") {
            id = normalizePath(id);
            if (id.startsWith(ctx.opts.routesDir)) {
              if (SERVER_ENDPOINT_FNS.some((fnName) => code2.includes(fnName))) {
                const modifiedCode = stripServerEndpoints(code2, id);
                if (typeof modifiedCode === "string") {
                  return modifiedCode;
                }
              }
            }
          }
        }
      }
      return null;
    },
    generateBundle(_2, bundles) {
      if ((ctx == null ? void 0 : ctx.target) === "client") {
        const entries = [...ctx.entries, ...ctx.serviceWorkers].map((entry) => {
          return {
            chunkFileName: entry.chunkFileName,
            extensionlessFilePath: removeExtension(entry.filePath)
          };
        });
        for (const entry of entries) {
          for (const fileName in bundles) {
            const c2 = bundles[fileName];
            if (c2.type === "chunk" && c2.isDynamicEntry && c2.facadeModuleId) {
              const extensionlessFilePath = removeExtension(normalizePath(c2.facadeModuleId));
              if (entry.extensionlessFilePath === extensionlessFilePath) {
                c2.fileName = entry.chunkFileName;
                continue;
              }
            }
          }
        }
      }
    },
    async closeBundle() {
      if ((ctx == null ? void 0 : ctx.target) === "ssr") {
        const manifest = globalThis.QWIK_MANIFEST || qwikPlugin.api.getManifest();
        const clientOutDir = globalThis.QWIK_CLIENT_OUT_DIR || qwikPlugin.api.getClientOutDir();
        if (manifest && clientOutDir) {
          for (const swEntry of ctx.serviceWorkers) {
            try {
              const swClientDistPath = (0, import_node_path8.join)(clientOutDir, swEntry.chunkFileName);
              const swCode = await import_node_fs6.default.promises.readFile(swClientDistPath, "utf-8");
              const swCodeUpdate = prependManifestToServiceWorker(ctx, manifest, swCode);
              if (swCodeUpdate) {
                await import_node_fs6.default.promises.writeFile(swClientDistPath, swCodeUpdate);
              }
            } catch (e2) {
              console.error(e2);
            }
          }
        }
      }
    }
  };
  return plugin;
}
var QWIK_CITY_PLAN_ID = "@qwik-city-plan";
var QWIK_CITY_ENTRIES_ID = "@qwik-city-entries";
var QWIK_CITY = "@builder.io/qwik-city";
var QWIK_CITY_SW_REGISTER = "@qwik-city-sw-register";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extendConfig,
  qwikCity
});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

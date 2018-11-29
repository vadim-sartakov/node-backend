"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccessDeniedError = exports.AccessDeniedError = function (_Error) {
    _inherits(AccessDeniedError, _Error);

    function AccessDeniedError() {
        _classCallCheck(this, AccessDeniedError);

        var _this = _possibleConstructorReturn(this, (AccessDeniedError.__proto__ || Object.getPrototypeOf(AccessDeniedError)).call(this, "Access is denied"));

        _this.name = "AccessDenied";
        return _this;
    }

    return AccessDeniedError;
}(Error);

var UnauthorizedError = exports.UnauthorizedError = function (_Error2) {
    _inherits(UnauthorizedError, _Error2);

    function UnauthorizedError() {
        _classCallCheck(this, UnauthorizedError);

        var _this2 = _possibleConstructorReturn(this, (UnauthorizedError.__proto__ || Object.getPrototypeOf(UnauthorizedError)).call(this, "Unauthorized"));

        _this2.name = "Unauthorized";
        return _this2;
    }

    return UnauthorizedError;
}(Error);
//# sourceMappingURL=index.js.map
/**
 * Responsive Devices Detect Directives for Angular 2
 *
 * @Created_by Manu Cutillas
 * @Contributors Christophe HOARAU
 * @created_at May 23, 2016
 * @updated_at May 27, 2016 - by Christophe HOARAU
 * @version_0.1.6
 *
 * Dependencies:
 * @angular/core : "2.0.0-rc.1"
 * rxjs: "5.0.0-beta.6"
 *
 * @more_info http://kalypso.agency
 *            https://github.com/ManuCutillas
 *            https://www.npmjs.com/~manucutillas
 *            https://github.com/no-more
 *
 * @description : Responsive Detect Directives for Angular 2
 *
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/share');
require('rxjs/add/operator/debounce');
var Rx_1 = require('rxjs/Rx');
// Configuration class in order to allow to change breakpoints values
var ResponsiveConfig = (function () {
    function ResponsiveConfig(config) {
        this.config = {
            breakPoints: {
                xs: { max: 767 },
                sm: { min: 768, max: 991 },
                md: { min: 992, max: 1199 },
                lg: { min: 1200, max: 1599 },
                xl: { min: 1600 }
            },
            debounceTime: 100
        };
        if (!!config)
            this.config = config;
    }
    ResponsiveConfig = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Object])
    ], ResponsiveConfig);
    return ResponsiveConfig;
}());
exports.ResponsiveConfig = ResponsiveConfig;
var ResponsiveState = (function () {
    function ResponsiveState(responsiveConfig) {
        var _this = this;
        this.sizeObserver = function () {
            _this.width = _this.getWidth();
            try {
                return _this.width; // I don't see how there could be an error here
            }
            catch (error) {
            }
            return null;
        };
        this.sizeOperations = function () {
            _this.width = _this.getWidth();
            try {
                if (_this._responsiveConfig.config.breakPoints.xl.min <= _this.width) {
                    return 'xl';
                }
                else if (_this._responsiveConfig.config.breakPoints.lg.max >= _this.width && _this._responsiveConfig.config.breakPoints.lg.min <= _this.width) {
                    return 'lg';
                }
                else if (_this._responsiveConfig.config.breakPoints.md.max >= _this.width && _this._responsiveConfig.config.breakPoints.md.min <= _this.width) {
                    return 'md';
                }
                else if (_this._responsiveConfig.config.breakPoints.sm.max >= _this.width && _this._responsiveConfig.config.breakPoints.sm.min <= _this.width) {
                    return 'sm';
                }
                else if (_this._responsiveConfig.config.breakPoints.xs.max >= _this.width) {
                    return 'xs';
                }
            }
            catch (error) {
            }
            return null;
        };
        this._responsiveConfig = !!responsiveConfig ? responsiveConfig : new ResponsiveConfig();
        var observer = Rx_1.Observable.fromEvent(window, 'resize').debounceTime(this._responsiveConfig.config.debounceTime);
        this.elementoObservar = observer.map(this.sizeOperations).share();
        this.anchoObservar = observer.map(this.sizeObserver).share();
    }
    ResponsiveState.prototype.getWidth = function () {
        return window.innerWidth;
    };
    ResponsiveState.prototype.getDeviceSizeInitial = function () {
        return this.sizeOperations();
    };
    ResponsiveState = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [ResponsiveConfig])
    ], ResponsiveState);
    return ResponsiveState;
}());
exports.ResponsiveState = ResponsiveState;
/*
 * DEVICES DIRECTIVES
 * @Desktops / @Tablets / @Mobiles
 */
/*======== DESKTOPS STATES =========*/
var IsDesktop = (function () {
    function IsDesktop(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.sizeLG = 'lg';
        this.sizeMD = 'md';
        this.noRepeat = 0;
        if (this.initialDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(IsDesktop.prototype, "isDesktop", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.sizeMD || valor == _this.sizeLG) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    IsDesktop.prototype.initialDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'lg' || initialDevice == 'md') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], IsDesktop.prototype, "isDesktop", null);
    IsDesktop = __decorate([
        core_1.Directive({
            selector: '[isDesktop]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], IsDesktop);
    return IsDesktop;
}());
exports.IsDesktop = IsDesktop;
/*======== TABLETS STATES =========*/
var IsTablet = (function () {
    function IsTablet(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.sizeSM = 'sm';
        this.noRepeat = 0;
        if (this.initalDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(IsTablet.prototype, "isTablet", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.sizeSM) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    IsTablet.prototype.initalDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'sm') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], IsTablet.prototype, "isTablet", null);
    IsTablet = __decorate([
        core_1.Directive({
            selector: '[isTablet]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], IsTablet);
    return IsTablet;
}());
exports.IsTablet = IsTablet;
/*======== MOBILE STATES =========*/
var IsMobile = (function () {
    function IsMobile(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.sizeXS = 'xs';
        this.noRepeat = 0;
        if (this.initalDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(IsMobile.prototype, "isMobile", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.sizeXS) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    IsMobile.prototype.initalDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'xs') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], IsMobile.prototype, "isMobile", null);
    IsMobile = __decorate([
        core_1.Directive({
            selector: '[isMobile]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], IsMobile);
    return IsMobile;
}());
exports.IsMobile = IsMobile;
/*
 *
 * Bootstrap standard screen sizes directives
 * LG / MD / SM / XS
 */
/*======== XL STATES =========*/
var XL = (function () {
    function XL(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.state = 'xl';
        this.noRepeat = 0;
        if (this.initalDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(XL.prototype, "xl", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.state) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    XL.prototype.initalDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'xl') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], XL.prototype, "xl", null);
    XL = __decorate([
        core_1.Directive({
            selector: '[xl]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], XL);
    return XL;
}());
exports.XL = XL;
/*======== LG STATES =========*/
var LG = (function () {
    function LG(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.state = 'lg';
        this.noRepeat = 0;
        if (this.initalDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(LG.prototype, "lg", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.state) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    LG.prototype.initalDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'lg') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], LG.prototype, "lg", null);
    LG = __decorate([
        core_1.Directive({
            selector: '[lg]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], LG);
    return LG;
}());
exports.LG = LG;
/*======== MD STATES =========*/
var MD = (function () {
    function MD(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.state = 'md';
        this.noRepeat = 0;
        if (this.initalDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(MD.prototype, "md", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.state) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    MD.prototype.initalDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'md') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], MD.prototype, "md", null);
    MD = __decorate([
        core_1.Directive({
            selector: '[md]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], MD);
    return MD;
}());
exports.MD = MD;
/*======== SM STATES =========*/
var SM = (function () {
    function SM(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.state = 'sm';
        this.noRepeat = 0;
        if (this.initalDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(SM.prototype, "sm", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.state) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    SM.prototype.initalDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'sm') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SM.prototype, "sm", null);
    SM = __decorate([
        core_1.Directive({
            selector: '[sm]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], SM);
    return SM;
}());
exports.SM = SM;
/*======== XS STATES =========*/
var XS = (function () {
    function XS(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.state = 'xs';
        this.noRepeat = 0;
        if (this.initalDeviceSize()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.noRepeat = 1;
        }
    }
    Object.defineProperty(XS.prototype, "xs", {
        set: function (element) {
            var _this = this;
            this._responsiveState.elementoObservar.subscribe(function (valor) {
                if (valor == _this.state) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    XS.prototype.initalDeviceSize = function () {
        var initialDevice = this._responsiveState.getDeviceSizeInitial();
        if (initialDevice == 'xs') {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], XS.prototype, "xs", null);
    XS = __decorate([
        core_1.Directive({
            selector: '[xs]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], XS);
    return XS;
}());
exports.XS = XS;
var ShowHideItBootstrap = (function () {
    function ShowHideItBootstrap(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.noRepeat = 0;
    }
    ShowHideItBootstrap.prototype.setGrid = function (grid_state) {
        this._grid_state = (Array.isArray(grid_state) ? grid_state : [grid_state]);
        this.updateView(this._responsiveState.getDeviceSizeInitial());
    };
    ShowHideItBootstrap.prototype.ngOnInit = function () {
        this._subscription = this._responsiveState.elementoObservar.subscribe(this.updateView.bind(this));
    };
    ShowHideItBootstrap.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ShowHideItBootstrap.prototype.showHide = function (show) {
        if (!!show) {
            if (this.noRepeat == 0) {
                this.noRepeat = 1;
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
        else {
            this.noRepeat = 0;
            this.viewContainer.clear();
        }
    };
    ShowHideItBootstrap.prototype.updateView = function (valor) {
        if (!!this._showWhenTrue) {
            this.showHide(!!this._grid_state && this._grid_state.indexOf(valor) !== -1);
        }
        else {
            this.showHide(!(!!this._grid_state && this._grid_state.indexOf(valor) !== -1));
        }
    };
    return ShowHideItBootstrap;
}());
/*======== MULTIPLE SIZES STATES =========*/
/* show */
var ShowItBootstrap = (function (_super) {
    __extends(ShowItBootstrap, _super);
    function ShowItBootstrap(templateRef, viewContainer, _responsiveState) {
        _super.call(this, templateRef, viewContainer, _responsiveState);
        this._showWhenTrue = true;
        // this._showWhenTrue = true;
    }
    Object.defineProperty(ShowItBootstrap.prototype, "showItBootstrap", {
        set: function (grid_state) {
            this.setGrid(grid_state);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ShowItBootstrap.prototype, "showItBootstrap", null);
    ShowItBootstrap = __decorate([
        core_1.Directive({
            selector: '[showItBootstrap]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], ShowItBootstrap);
    return ShowItBootstrap;
}(ShowHideItBootstrap));
exports.ShowItBootstrap = ShowItBootstrap;
/* hide */
var HideItBootstrap = (function (_super) {
    __extends(HideItBootstrap, _super);
    function HideItBootstrap(templateRef, viewContainer, _responsiveState) {
        _super.call(this, templateRef, viewContainer, _responsiveState);
        this._showWhenTrue = false;
        // this._showWhenTrue = true;
    }
    Object.defineProperty(HideItBootstrap.prototype, "hideItBootstrap", {
        set: function (grid_state) {
            this.setGrid(grid_state);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], HideItBootstrap.prototype, "hideItBootstrap", null);
    HideItBootstrap = __decorate([
        core_1.Directive({
            selector: '[hideItBootstrap]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], HideItBootstrap);
    return HideItBootstrap;
}(ShowHideItBootstrap));
exports.HideItBootstrap = HideItBootstrap;
/*======== CUSTOM SIZES =========*/
/* show */
var ShowItSizes = (function () {
    function ShowItSizes(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.noRepeat = 0;
        this.callInit = 0;
    }
    Object.defineProperty(ShowItSizes.prototype, "showItSizes", {
        set: function (_grid_state) {
            var _this = this;
            if (this.callInit == 0) {
                this.init(_grid_state);
                this.callInit = 1;
            }
            this._responsiveState.anchoObservar.subscribe(function (size) {
                if (size >= _grid_state.min && size <= _grid_state.max) {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
                else {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    ShowItSizes.prototype.init = function (_grid_state) {
        var width = this._responsiveState.getWidth();
        if (width >= _grid_state.min && width <= _grid_state.max) {
            if (this.noRepeat == 0) {
                this.noRepeat = 1;
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
        else {
            this.noRepeat = 0;
            this.viewContainer.clear();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ShowItSizes.prototype, "showItSizes", null);
    ShowItSizes = __decorate([
        core_1.Directive({
            selector: '[showItSizes]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], ShowItSizes);
    return ShowItSizes;
}());
exports.ShowItSizes = ShowItSizes;
/* hide */
var HideItSizes = (function () {
    function HideItSizes(templateRef, viewContainer, _responsiveState) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._responsiveState = _responsiveState;
        this.noRepeat = 0;
        this.callInit = 0;
    }
    Object.defineProperty(HideItSizes.prototype, "hideItSizes", {
        set: function (_grid_state) {
            var _this = this;
            if (this.callInit == 0) {
                this.init(_grid_state);
                this.callInit = 1;
            }
            this._responsiveState.anchoObservar.subscribe(function (size) {
                if (size >= _grid_state.min && size <= _grid_state.max) {
                    _this.noRepeat = 0;
                    _this.viewContainer.clear();
                }
                else {
                    if (_this.noRepeat == 0) {
                        _this.noRepeat = 1;
                        _this.viewContainer.createEmbeddedView(_this.templateRef);
                    }
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    HideItSizes.prototype.init = function (_grid_state) {
        var width = this._responsiveState.getWidth();
        if (width >= _grid_state.min && width <= _grid_state.max) {
            this.noRepeat = 0;
            this.viewContainer.clear();
        }
        else {
            if (this.noRepeat == 0) {
                this.noRepeat = 1;
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], HideItSizes.prototype, "hideItSizes", null);
    HideItSizes = __decorate([
        core_1.Directive({
            selector: '[hideItSizes]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, ResponsiveState])
    ], HideItSizes);
    return HideItSizes;
}());
exports.HideItSizes = HideItSizes;
//# sourceMappingURL=sizes.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
// Connecting to Mongoo Atlas database
mongoose.connect('mongodb+srv://admin:root@cluster0.di5cg.mongodb.net/memorydb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var app = express();
var puntuacionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    score: {
        type: Number,
        required: false,
    },
});
var Puntuacion = mongoose.model('puntuaciones', puntuacionSchema);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/puntuaciones', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puntuaciones;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Puntuacion.find({})];
            case 1:
                puntuaciones = _a.sent();
                console.log(puntuaciones);
                try {
                    res.send(puntuaciones);
                }
                catch (err) {
                    res.status(500).send(err);
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/puntuaciones', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puntuacion, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                puntuacion = new Puntuacion({
                    name: req.body.name,
                    score: req.body.score,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, puntuacion.save()];
            case 2:
                _a.sent();
                res.send(puntuacion);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).send(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/puntuaciones/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puntuacion, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Puntuacion.findByIdAndDelete(req.params.id)];
            case 1:
                puntuacion = _a.sent();
                if (!puntuacion)
                    res.status(404).send("No item found");
                res.status(200).send();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).send(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*
app.put('/puntuaciones/:id', async (req: any, res: any) => {
  try {
    const puntuacion = await Puntuacion.findByIdAndUpdate(req.params.id, req.body)
    await Puntuacion.save()
    res.send(puntuacion)
  } catch (err) {
    res.status(500).send(err)
  }
});
*/
/*
// This is not working with Heroku, IP and PORT are automatically asigned
const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});
*/
// start the server listening for requests
app.listen(process.env.PORT || 3000, function () { return console.log("Server is running..."); });

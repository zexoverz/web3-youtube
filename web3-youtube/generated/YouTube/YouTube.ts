// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class VideoUploaded extends ethereum.Event {
  get params(): VideoUploaded__Params {
    return new VideoUploaded__Params(this);
  }
}

export class VideoUploaded__Params {
  _event: VideoUploaded;

  constructor(event: VideoUploaded) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get hash(): string {
    return this._event.parameters[1].value.toString();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }

  get description(): string {
    return this._event.parameters[3].value.toString();
  }

  get location(): string {
    return this._event.parameters[4].value.toString();
  }

  get category(): string {
    return this._event.parameters[5].value.toString();
  }

  get thumbnailHash(): string {
    return this._event.parameters[6].value.toString();
  }

  get date(): string {
    return this._event.parameters[7].value.toString();
  }

  get author(): Address {
    return this._event.parameters[8].value.toAddress();
  }
}

export class YouTube__videosResult {
  value0: BigInt;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
  value7: string;
  value8: Address;

  constructor(
    value0: BigInt,
    value1: string,
    value2: string,
    value3: string,
    value4: string,
    value5: string,
    value6: string,
    value7: string,
    value8: Address
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    map.set("value4", ethereum.Value.fromString(this.value4));
    map.set("value5", ethereum.Value.fromString(this.value5));
    map.set("value6", ethereum.Value.fromString(this.value6));
    map.set("value7", ethereum.Value.fromString(this.value7));
    map.set("value8", ethereum.Value.fromAddress(this.value8));
    return map;
  }

  getId(): BigInt {
    return this.value0;
  }

  getHash(): string {
    return this.value1;
  }

  getTitle(): string {
    return this.value2;
  }

  getDescription(): string {
    return this.value3;
  }

  getLocation(): string {
    return this.value4;
  }

  getCategory(): string {
    return this.value5;
  }

  getThumbnailHash(): string {
    return this.value6;
  }

  getDate(): string {
    return this.value7;
  }

  getAuthor(): Address {
    return this.value8;
  }
}

export class YouTube extends ethereum.SmartContract {
  static bind(address: Address): YouTube {
    return new YouTube("YouTube", address);
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  videoCount(): BigInt {
    let result = super.call("videoCount", "videoCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_videoCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("videoCount", "videoCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  videos(param0: BigInt): YouTube__videosResult {
    let result = super.call(
      "videos",
      "videos(uint256):(uint256,string,string,string,string,string,string,string,address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new YouTube__videosResult(
      result[0].toBigInt(),
      result[1].toString(),
      result[2].toString(),
      result[3].toString(),
      result[4].toString(),
      result[5].toString(),
      result[6].toString(),
      result[7].toString(),
      result[8].toAddress()
    );
  }

  try_videos(param0: BigInt): ethereum.CallResult<YouTube__videosResult> {
    let result = super.tryCall(
      "videos",
      "videos(uint256):(uint256,string,string,string,string,string,string,string,address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new YouTube__videosResult(
        value[0].toBigInt(),
        value[1].toString(),
        value[2].toString(),
        value[3].toString(),
        value[4].toString(),
        value[5].toString(),
        value[6].toString(),
        value[7].toString(),
        value[8].toAddress()
      )
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class UploadVideoCall extends ethereum.Call {
  get inputs(): UploadVideoCall__Inputs {
    return new UploadVideoCall__Inputs(this);
  }

  get outputs(): UploadVideoCall__Outputs {
    return new UploadVideoCall__Outputs(this);
  }
}

export class UploadVideoCall__Inputs {
  _call: UploadVideoCall;

  constructor(call: UploadVideoCall) {
    this._call = call;
  }

  get _videoHash(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _title(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _location(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _category(): string {
    return this._call.inputValues[4].value.toString();
  }

  get _thumbnailHash(): string {
    return this._call.inputValues[5].value.toString();
  }

  get _date(): string {
    return this._call.inputValues[6].value.toString();
  }
}

export class UploadVideoCall__Outputs {
  _call: UploadVideoCall;

  constructor(call: UploadVideoCall) {
    this._call = call;
  }
}

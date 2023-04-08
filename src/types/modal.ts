export namespace Modal {
  export namespace Type {
    export type On = 'modal/on';
    export type Off = 'modal/off';
  }

  export namespace Payload {
    export type On = {
      type: ModalType;
      text?: string;
      value?: any;
    };
    export type Off = { id: string };
  }

  export namespace Action {
    export type On = {
      type: Type.On;
      payload: Payload.On;
    };
    export type Off = {
      type: Type.Off;
      payload: Payload.Off;
    };
  }
  export type Actions = Action.On | Action.Off;

  export interface Store {
    [index: string]: any;
    modalList: ModalState[];
    isProcessing: boolean;
    zIndex: number;
  }
  export interface ModalState {
    type: ModalType;
    text?: string;
    value?: any;
    id: string;
    zIndex: number;
  }

  export type ModalType = 'search' | 'confirm' | 'alert';

  export interface ModalPropsType {
    type: ModalType | undefined;
    text?: string;
    value?: any;
    id: string;
    zIndex: number;
    onClickClose: (id: string) => void;
  }
}

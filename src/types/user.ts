export namespace User {

    export namespace Payload {

    };

    export interface Store {

    };

    export interface UserInfo {
        userEmail?: string;
        userNickName?: string;
        userPassword?: string;
        userPasswordCheck?: string;
        userImg?: string;
        userLocation?: string;
    };

}



export namespace Member {
	export namespace Payload {
		export type GetPartnerList = Array<PartnerInfo>;
		export type GetUserList = {
			userList: Array<UserInfo>;
			totalCount: number;
		};
	}
	export interface Store {
		[index: string]: any;
		partnerList: Array<PartnerInfo>;
		userList: Array<UserInfo>;
		userTotalCount: number;
	}

	export interface PartnerInfo {
		memberKey: string;
		bank: string;
		account: string;
		status: string;
		name: string;
		regDate: string;
		lastLoginDate: string;
		id: number;
		nickName: string;
		information?: string;
		phone?: string;
		profile?: string;
		storeName?: string;
		email?: string;
	}
	export interface UserInfo {
		createdAt: string;
		email: string;
		lastLoginAt: string;
		memberKey: string;
		name: string;
		nickName: string;
		phone: string;
		point: number;
		id: number;
		age: number;
		gender: 'W' | 'M' | '';
	}
	export const initialPartnerInfo = {
		memberKey: '',
		bank: '',
		account: '',
		status: '',
		name: '',
		nickName: '',
		regDate: '',
		lastLoginDate: '',
		id: 0,
	};
	export const initialUserInfo = {
		createdAt: '',
		email: '',
		lastLoginAt: '',
		memberKey: '',
		name: '',
		nickName: '',
		phone: '',
		point: 0,
		id: 0,
		age: 0,
		gender: '',
	};
}
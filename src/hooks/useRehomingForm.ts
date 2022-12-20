import { useState } from 'react';
import { errorMessage } from '../utils/console';
import { rehomingAPI } from '../network/api';
import { useNavigate } from 'react-router-dom';

export interface RehomingType {
  rehomingImgFile: object;
  rehomingImgUrl: string;
  postType: string;
  title: string;
  username: string;
  maximum: string;
  petBirth: string;
  petCategory: string;
  petType: string;
  petGender: string;
  rehomingRegion: string;
  description: string;
  rehomingPrice: number;
  tag: string[];
}
type TransferFormData = {
  (data: any, exceptKeyList: Array<string>): FormData;
};
type Submit = (action: string, id?: string) => void;

const initialAccompany = {
  rehomingImgFile: {},
  rehomingImgUrl: '',
  postType: '',
  title: '',
  username: '',
  maximum: '',
  petBirth: '',
  petCategory: '',
  petType: '',
  petGender: '',
  rehomingRegion: '',
  description: '',
  rehomingPrice: 0,
  tag: [''],
};
/** 분양글 작성, 수정 도와주는 custom hook
 *
 * @return {form,setForm,initForm,submitAdd,submitEdit}
 * @author 2022.11.21 Edel
 **/
const useRehomingForm = () => {
  const [form, setForm] = useState(initialAccompany);
  const navigate = useNavigate();
  const initForm = (data: RehomingType) => {
    if (!data) {
      setForm(initialAccompany);
      return;
    }
    setForm({
      rehomingImgFile: data.rehomingImgFile,
      rehomingImgUrl: data.rehomingImgUrl,
      postType: data.postType,
      title: data.title,
      username: data.username,
      maximum: data.maximum,
      petBirth: data.petBirth,
      petCategory: data.petCategory,
      petType: data.petType,
      petGender: data.petGender,
      rehomingRegion: data.rehomingRegion,
      description: data.description,
      rehomingPrice: data.rehomingPrice,
      tag: data.tag,
    });
  };
  /** form data 만들어주는 함수
   *
   * @return {FormData}
   * @author 2022.11.18 Edel
   **/

  const makeFormData: TransferFormData = (data, exceptKeyList) => {
    const form = new FormData();
    for (let key in data) {
      if (exceptKeyList.find((el) => el === key)) {
        continue;
      }
      form.append(key, data[key]);
    }
    return form;
  };
  /**
   * @param {"add"||"edit"} 분양글 추가 || 분양글 수정
   * @param {editDataType} 수정할 때 필요한 옵셔널 인자 - 필수 값은 accompanyId
   *
   * @author 2022.11.18 Edel
   **/
  const submit: Submit = async (action, id) => {
    const exceptKeyList = ['rehomingImgFile'];
    const submitData = makeFormData(form, exceptKeyList);

    try {
      const result = await switchAPI(action, submitData, id);
      console.log(result);

      navigate(`/community/accompany/detail/${id}`);
    } catch (err: any) {
      throw errorMessage(err);
    }
  };

  const submitAdd = () => submit('add');
  const submitEdit = (id: string) => submit('edit', id);

  return {
    form,
    setForm,
    initForm,
    submitAdd,
    submitEdit,
  };
};

export default useRehomingForm;

type SwitchType = (action: string, submitData: FormData, id?: string) => void;

const switchAPI: SwitchType = (action, submitData, id) => {
  switch (action) {
    case 'add':
      return rehomingAPI.addReHoming({ data: submitData });
    case 'edit':
      return rehomingAPI.editReHoming({
        data: submitData,
        parameter: id,
      });
  }
};

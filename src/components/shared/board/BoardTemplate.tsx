// ** Import React
import React from "react";

// ** Import utils
import * as S from './BoardTemplate.style';

// ** Import components
import TitleSection, {TitleSectionPropsType} from "../layout/TitleSection";

interface PropsType extends TitleSectionPropsType {
    // TODO: 헤더 영역 이외 props 필요 시 작성 예정
}

const BoardTemplate = (props: PropsType) => {
    const {title, buttonText, onClick} = props;

    return (
        <S.Container>
            {/* ----------헤더영역----------*/}
            <TitleSection
                title={title}
                buttonText={buttonText}
                onClick={onClick}
            />
        </S.Container>
    )
}

export default BoardTemplate;

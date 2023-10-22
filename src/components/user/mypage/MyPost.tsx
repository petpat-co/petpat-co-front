import React from 'react';
import { Button, DisplayGrid, Text } from 'src/components/shared/element';
import styled from 'styled-components';
import { RootState, useAppDispatch } from 'src/core/store';
import { getRehomingListApi } from 'src/core/redux/user/myPage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  img?: string;
}
const MyPost = (props: any) => {
  const navigate = useNavigate();
  const onClickReadMore = (type: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    props.setTapName(type);
    navigate(`/mypage/post/${type}`);
  };
  const appdispatch = useAppDispatch();

  const rehomingList: Array<any> = useSelector(
    (state: RootState) => state.user.mypage?.myPostList?.rehoming,
  );
  // const tradeList: Array<any> = useSelector(
  //   (state: RootState) => state.user.mypage?.myPostList?.trade,
  // );
  const ButtonStyle = {
    margin: '12px',
    padding: '0 20px',
    width: '118px',
    height: '42px',
    border: '1px solid black',
    radius: '30px',
    fontSize: '18px',
    fontWeight: '700',
  };

  const TextStyle = {
    margin: '32px 0',
    size: 'xxlarge',
    weight: 'lbold',
    colors: 'primary',
  };

  React.useEffect(() => {
    appdispatch(getRehomingListApi(''));
  }, [appdispatch]);

  return (
    <React.Fragment>
      <PostPreviewContainer>
        <DisplayGrid height="fit-content">
          <Text textStyle={{ ...TextStyle }}>내가 작성한 분양글</Text>
          <Button
            {...ButtonStyle}
            _onClick={() => {
              onClickReadMore('rehoming');
            }}
          >
            더 보기
          </Button>
        </DisplayGrid>
        <Table>
          <thead>
            <tr>
              <th className="th-date">작성일</th>
              <th className="th-title">분양정보</th>
              <th className="th-username">분양인</th>
            </tr>
          </thead>
          <tbody>
            {rehomingList
              ? rehomingList.map((post, i) => {
                  return (
                    <tr key={i}>
                      <td>{post.createdAt}</td>
                      <td className="td-title">
                        <Img img={post.rehomingImg} />
                        <Text>
                          {post.petType}, {post.petCategory} / {post.petName} /{' '}
                          {post.petBirth.split('.')[0]}년{' '}
                          {post.petBirth.split('.')[1]}월{' '}
                          {post.petBirth.split('.')[2]}일생 / 남
                        </Text>
                      </td>
                      <td>{post.username}</td>
                    </tr>
                  );
                })
              : postList.map((post, i) => {
                  return (
                    // 나중에 postList map 삭제
                    <tr key={i}>
                      <td>{post.createdAt}</td>
                      <td className="td-title">
                        <Img img={post.rehomingImg} />
                        <Text>
                          {post.petType}, {post.petCategory} / {post.petName} /{' '}
                          {post.petBirth.split('.')[0]}년{' '}
                          {post.petBirth.split('.')[1]}월{' '}
                          {post.petBirth.split('.')[2]}일생 / 남
                        </Text>
                      </td>
                      <td>{post.username}</td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </PostPreviewContainer>

      <PostPreviewContainer>
        <DisplayGrid height="fit-content">
          <Text textStyle={{ ...TextStyle }}>내가 좋아요 한 글</Text>
          <Button
            {...ButtonStyle}
            _onClick={() => {
              onClickReadMore('trade');
            }}
          >
            더 보기
          </Button>
        </DisplayGrid>
        <Table>
          <thead>
            <tr>
              <th className="th-date">거래일</th>
              <th className="th-title">거래내역</th>
              <th className="th-username">거래자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023.06.09</td>
              <td className="td-title">
                <Img />
                <Text>강아지, 푸들 / 멍멍이 / 2022년 12월 19일생 / 남</Text>
              </td>
              <td>댕댕이집사</td>
            </tr>
          </tbody>
        </Table>
      </PostPreviewContainer>
    </React.Fragment>
  );
};

export const PostPreviewContainer = styled.div`
  margin: 0 0 80px 0;
  width: 100%;
`;

export const Table = styled.table<PropsType>`
  width: 100%;
  border-top: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  border-collapse: collapse;

  & > thead > tr > th {
    box-sizing: border-box;
    padding: 32px 0;
    border-bottom: 1px solid #111827;
  }

  & > tbody > tr {
    border-bottom: 1px solid #d1d5db;
  }

  & > thead > tr > .th-date {
    padding: 16px;
  }

  & > thead > tr > .th-username {
    width: 158px;
  }

  & > tbody > tr > td {
    text-align: center;
  }

  & > tbody > tr > .td-title {
    display: flex;
    align-items: center;
    text-align: left;
  }

  & > tbody > tr > td > div {

`;

export const Img = styled.div<PropsType>`
margin: 40px 30px;
width: 80px;
height: 80px;
background-color: #ddd;
background-image: ${({ img }) => (img ? `url(${img})` : '')};
}
background-size: cover;
background-position: center;
`;

const postList = [
  {
    rehomingImg:
      'http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    title: '강아지 부냥부냥',
    username: '오애렁',
    petName: '이름 미정',
    petBirth: '2022.09.10',
    petCategory: '강아지',
    petType: '퍼그',
    rehomingRegion: '서울시 노원구',
    description: '장난감 가지고 노는 걸 좋아해요. 좋은 주민 만나면 좋겠어요.',
    rehomingPrice: '50,000',
    createdAt: '2022-09-31',
    updateAt: '2022-09-31',
    isBookmark: true,
    isCompleted: false,
    viewCount: 10,
    bookmarkCount: 5,
  },
  {
    rehomingImg: 'https://pbs.twimg.com/media/EdmVZrMUEAEbRmM.jpg',
    title: '부냥함니당',
    username: '유나룽',
    petName: '주무루미',
    petBirth: '2023.02.20',
    petCategory: '쿵야',
    petType: '주먹밥쿵야',
    rehomingRegion: '서울시 영등포구',
    description: '밥풀조심',
    rehomingPrice: '0',
    createdAt: '2023-8-10',
    updateAt: '2023-8-10',
    isBookmark: true,
    isCompleted: false,
    viewCount: 20,
    bookmarkCount: 32,
  },
  {
    rehomingImg:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDxEPEBAQEA8PFRAWFRAVDxAQFRYPGBYWFxUWFRcYHiggGBolGxUVITEhJSkrLi4uFx80OTQtOCgtLisBCgoKDg0OGhAQGi0mIB8tLS0tLSstKy0rLSsrLS0tLS0tLSstLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQQCAwUGBwj/xAA7EAACAQIDBQUGBQIGAwAAAAAAAQIDEQQSIQUxQVFhEyJxgZEGMlKhsdEHFEJyweHwFSMzYoKSFkSi/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EADIRAAIBAgMFBwIGAwAAAAAAAAABAgMRBCExEkFhsfAFUXGBkaHREyIyQlLB4fEUFSP/2gAMAwEAAhEDEQA/APfkAHOJAACAAEAAIJACABiIAAAEAAIQAAgABAACAAAAAQgYgCAEggBAgAQAEAALIALi0AEAAIBICABiIAAAEAAIQAAgABAAAQAAAAQgYgCAEggBAgECAEggBAAABZAILi4EmJICABiIAAAEAAIQAAgABAACAQAEgAQgYgCAEggBAgECAEggBAAgAJBAAC0YgkuLQAYiAAABAACEAAIADGUklduyXEpTxjk7Q0XPi/DkWU6UqjtEvoYapWf27tXuXXcrlyUkt7sYuqufpdlek7O+99dS5SqJ+JsWCjvZv/10Yr7pN+Fl8nPxG0HHdTlbm1YwobScnZ5V/wBvuXsRQ4o51fCRlu7suf3LlhqS3GynhMNb8PNl9VH09Datd2vojj0cU4PJU0a4lyniFwfzIywtJ7reBCp2dSeit4FskU6qlo95FRW8DJUwco5xz5nMrYGpB/bnz/nyz4Ag0fmo3t3r9UkbYTT4lSw9V/lZV/h1/wBDJJMlBP8AWiXR6/If+LV7vdfInhK36fdfJrBMoNEFEouLs0Z5RcXaSsQQAREASBXAsgGJeWgAAIAAQgABADGUkk23ZLe+hkcXb+Ltlor9Wsv28F6/QspU3Ukooto0nVmoLfyNeKxjqPTSC3Ln1Zlh3cp01oXMMzrxioqyPVxpxpwUYqyRfgjOD1Viu66SMYzlPdohlWyzp1K8Y73ryWrK9ZNrNlyrrvGBoyby04ZpcXwXi+HhvO1h9iR96tJ1H8K7sF5b2JuxlnVp0dX8+nyeXxGHda0IRc6q3Jb8vG/Q2YfA4i1lhqt1zpuP1se3o0IQVoQjBcoxUfobBbRnl2m9Ixy4v4yPGrBYlf8Arz9Yv5XEq2T/AFadal1cJJeu49kBbRFdov8ANBeTa+Tw9anGavFqS5revFFJVXF2Z6zaPs9TnedF9jU6LuN9Y8PFfM83i8LO7pVI5a0dVykuDT4pk00zoYfEU6iyfk9V8mynXuZVMU1pH1+xzcNJt2fA3zkkhl7grmztZc36s3Yevrlfk/ocz89C9rq/ir+hvi7q6K6tJVI7L/orxGHhWhsy8n3Pr1OoSa6Ms0U+dv8AsZnDkmnZ7jycouLcZarIAgESJZABeWgAp4jGpaQ7z571/UlCEpu0UWUqM6stmCv1v68CzUqKKu3Yryxnwx9UVFeTu3dl3D4bizdDCRS+7Pkden2fSpq9R3ft8vzM6E5y32S8Jfc21ZKKuzYlZHOxlW5a8PTe4awtKo7bOXAswrRluevLieSxlftMROXDM0vBaL6G7alRpZotqUdU07NM5mCeqCjh1Tk5JkqOEjQrXTvdfv8AwdeJmpmCNtCnmkkXHWZvw9LNq9yOrs7AyrNWvGmuPF+HTqasJhc8si9yFs3V/Cv5PW4WioRSRFyOVjMW4fbHXl/PLx0nC4aNOKjBJJG4ArOK3fNgkAABBJAAcvbW2FhVSk4ZqdSeSU1L3NHr13P0OdtitKti/wArGMLxoqrCeubM21a+7K1FrxszdgfZxQ/MUJtVMHWs4025ZoTvz6aWe/Rcrvr08FSjKM1COeEOzjNq8lT07ubfbRFl4LTru9M/kshPYkpR1XX9nhXG05Pdms7cnua9UaJU+0qKDbUIrNK2mnBeZ3vaTB5KyqJd2rfynx9d/qcSlNKpLqo/Qknc9FCoqkFKO9F+XZKGTs45fhyqxQhBQnlj7k7uKe9Nb0bK1a0or4nb5N/wa60rSh+76qwEoxtoXcE9GuT+tvsWCpgt8v75ls4uKX/aXW5Hmu0VbEztw90gADOYiyRIko7VrNRUV+vf+00wg5yUVvNVGk61RQW/rr0NGLxjk8sNFz5/0NUI2MIKxmdeEFBWienp040o7EFZdZviZJs3U8VNcfXUqTqJb2a/zceZIm431OvTxqeklbqjTiqfFargylTrxluaN9OpbThyEV7FndHJx8b3XQ5OCdnbkeg2lQs8y3M89BWqNdSaFV1jI7kdx0cFSairLvzdkc/DQzNLmeg2ZRvJy4Q7q/c9/wArepBksTV+nBvrgdfZeGUbRW6PHnJ72zbs/a8K9SvRipRqUHJNSSV7NrMul7eq5m3AR0bMFseksV+cTlGo4uMkmlGW5ZpLnZJeS5Ihlnfy8Tzcndts5XsztatPBV61ZupUoSq30V7xgpONlybasXvZTFVauFjUrSzylKdpWSvC9lu4XudZRS3JK/S2pKVtEOUk72Vrv04e5FtMEgEBAAgAB4/229uaeAvRpqNXFNXytvJTT3OpbVvjlWvVaX7XtVtlYLCVMQ7OSWWEXxqy0j5cX0TPzlidqSlX7aajWefPJVLyVSV7yUujJxSteQ1a12eixP4hY+rJ568ZRvfs+xpZU/JZufG56rY+PjjKKrRtCpFuMlvWZa28NU14nQx2yKO2dlQr0KcYTjGUqKSinCpHSdF24NxceW58jx/4fVssK+uknSsutpX/AIJp3WR0cBVkqignk78rnsMNSalnqOLy+7FNvXddmqUs1RcoXk/Ld82iVVc3ljq/kvFmaiorJHvSk1mlzfBLoB2bdcC7s9d1vq/Sy/qWjClDLFR5IyODVntzcu88hiav1aspre/bRewBIKrlBZONj53qv/bZfO/1Z2Dh4n/Un+6f1Olg197fA7XZMU6sn3LmzJGuvUstN73GcTXbvp8lc6J3CaGGS70+9LlwXlxOnRqRtayXkiikI1VdpPdo/ECEo3LmJwNOeqSjPhJaa9eZRpt6xfvRdmWI1mirGearPwj66gKCayZurLNTkuWqPMyj/mvyPUQ3S8GedhTc6zS6L7jQpblxO3s6Noub4I9BsuFqMXxneT/5ar5WOBiu7TjTjvk4xXi3b+T1FOKSSW5JLyRCRi7Qnko9+fpl8nTwS7qOTtj2zwGFk4VK6lUjo6dNOrJPlK2kX0bR5P8AEX2rqUYw2fhXJV6yTnKF86hJtRhC36pdNUrc9Plz2dipYl4KnQnPErR0Y5ZNPKpO7TsrJ6tuyCMVa8jkO2rPsD/FfBXt2GLtzy0Pp2h1tl+3mzsQ1FVuyk90asez/wDrWPzPz5tLCV8PVnQxEJUq1NpSpu102k1qm09GtUzRDESW5ivT7mR2on6wTvqtU+PQHyT2QxuPwmHo4qi3jcBUjmnQX+pTeqmoRd9U0/dbvbct6+o7M2hSxNGFejJTpVFdP6prg07proKUbaZobjYtggERHzv8Q6bx20dn7JVR041c9WpJWuo2lqr/AKstOol+4+V+2uxqWBx9bCUasqtOlk70srknKCk4ycUk2r8keo/FrtVtWdSEpxnTo4eUJRbjJLv3aa135tx8/jGdSX6pzm73bcm297be/wASbTshSvkfYvwIq1OxxdKcJ9jmp1ac3GWVzkpQqqMt2nZ09FzZu/8AHZYTtIqDlCc6tVyUG4pSnLKm7W0ioryOh+Gm1q8sN+UlCn2eDhSpwqRTTlJ30a3XSSbf+5cz0m0sY6LpqzlGaknue62/1CadKTUsramrD1Xh5ttep4dPgvRHQwWGy96XvPcuS+5upYaEdUtebs2bDm4jF/UWzHTmTxvaf1YunSVk9XvfDgu/e9Mt4kAwnIAAEBZOLtKGWq3wkk/NuzO0VNoYfPHT3o6/dG7D1FCpno8jpYCuqVZOWjyf7e9vLPccyLIm7OL5przTua0zN6qz8nyZ1j0zVmboMwxeEmpdrSWaMrZorVqSVr24p2NcKttHo0WqOJtuYFck9UUe1qS0jTnfrFx+bLWDw2RNyd5S3/YszxTe9laviUldsAW09TDG18lOT4vRLm2adlYXJHPLe/q95EaTqSU6mkY+7H+Wba1a/wDCAFG7MYTz4qhHnNPyjr/CPYniaeHqUcXRqz9yW5r9MuMX11/ux7OErohtKSTizi4urGrU2ovLceK29smVPbeCxjWajXlGDlwjXVOUYp8rrK11TOHhPaP/AAja+0a06HbupKcX3skoxlJVIWbT0acbrouR9Yp0YVU6dRKUZWfhJNOMlyaaTT4NI8N+IvszKVVYynTdTu5K0FG7lBe7Uilvau01vta24lG0moyy3GSylkz5b7T7cqY/F1cXUjGEqmW0I6qMIpKKvx0W807C2dUxWIp4elbPVairuyV+LfBF6vsGOZ2qZF8MoarpvR0tmbHqqUI4WFSdaTVqiUoJS4NztaEVvv8AVlywlSP3Tskt91n4d41h5J3lp1pY+z+w3szLAYJYavKnUlGpVkpwcrZJPMlqlZ3bOxhtn06MqjprL2rzSS3OdrOVuDaSu+NkaNkdpTw9KlOc61SEUpVZaOc/1S83fTgi7Hm95kKs95kSanXjzXqUsXtnD0pKNStThJq6Upxi7c9WIFFs8/7e+ys8W6eJw6i8RSWSUG1HtKN7pZnopRbbV9O9LocnYn4b2l2mIlCm3vp0nmb/AHTa08l5ntMFtenXf+TepDjVir0/BS3Sfhe3Gxecy+OIqQjsJ25rwe7yLVOcVYr4DA0cPTVOlCNOEeC+bb4vqzj7Sx6qtJK0Yt2fF/Y7NeV4tc016nl3FqTTVsun/IyV2vpSbJRhD6VSU9UsvMkkA45zQYgCAAAALQIBeWnOx+Bu3OG/jH+Uc5s9EV8Rg4T1as/iVvnzNlHF7K2Z6d51sH2n9NKFXNd+/wA+/n4nFvferoyjTjwm4+KuWamzZr3WmvmangqnL+/U2KtTekkdaOKw81lNebS52ZHYR41vSLMbU4u8U5S+KTv6Iy/JVPh+n3N1PZk370kuieZhKvTjrJEZ4rDwV5VF5NP2jdlWdRvq+C+xfwGCa78/e4R5dX1LNDCQhuV38T1f9DcYa+L2lsxyRyMZ2k6i2KWS3ve/jn4LXRjYRlTkpWStv5PgyNi7QzxSb7yOpU2RnpPN7z1S5f1PHVVKhUduD1L8LTcYZ7+v7MlKLSzPcYWvaSZZq7WpLS7n4K6+Z5Wlje0puKdm00VqOIlDuyT0NKjfU6GGwka123mtx7CjjMPNpZYxb5wS18S9lS3JLwVjyGHl2jtHj/ep6eNRWSveyWvNkZRSKsVh40mkvQtqSMZzvoVnVMXVXMiZdkoP2dw6fc7amvgp4nEU4W6RjKy8izhtl4emrRo09XdtxzycucpSu2+rZt/MLmYTxkVxG22TvLvLLkV62JS4nPxW0+Ry6mIlN6CyWbBRtmzpYnaDekeJSMKcLdXzNhzMRX+o7R0XvxMlWptZLQGIBlKQAQAjIGIEBaABeWgxAEAJBACBAAgB2NjYKOVVZat3yrlbS/icc3UsZOMcqfd5altGUYyvIcWr5nW2rj404tLWR5Ongs03UqeKj/L+x0Jybd2QXVcU2rQy4lkquVkc/F7Ou3Om8s+K/S3/AAyosXOnpUi49Xu8mdkhojTxcoK0s111mKNVric+GOT3M3LaDW6XzMp4Ck99OPksv0K2K2ZDLeF4tP4pPTzNUMVTk0rPPwtzL4V4t2sb/wDE5fEQ9pS+I562XOS0c35XK2H2dVnJxd1lerenE1WRdfgdd498zKNSctyfjuRhg9mwpvN70lxfDwLphq4tRdoZ8TNPEZ2ijRGh8T8l9zdGKW7QyBhqVZ1PxMzznKWrBiAVEAAQAgAQICQQAAtmIBcWgkEAIEACAAEAIAEAAIJIEAJBiIAAAEdLAYinGNpO3TqUcRNSnJrRNuxrILqtaVRJS3E51HJWYJAKCsGIAgABACABAgBIIACQQBCLJIILy0EAgQAkEAIAEAAIJIEAJBiIAAAEACAAEgCEDEAQAAgBAAgQAkAABAAhAAABZIALi0gkEAIAEAAIAEAJBiICSAAEACAAEgCEDEAQAAgBAAgQAkEAAAAhAAAAAAAWGQAXFoIAAQAAgIJAEwIIYACAAACCQBMQAAgMQAAmCABACAAAkgAQgAAAAAAAAAD/2Q==',
    title: '부냥쿠',
    username: '유나룽룽',
    petName: '샐러룽야',
    petBirth: '2023.02.20',
    petCategory: '쿵야',
    petType: '샐러리쿵야',
    rehomingRegion: '서울시 영등포구',
    description: '밥풀조심',
    rehomingPrice: '0',
    createdAt: '2023-8-10',
    updateAt: '2023-8-10',
    isBookmark: true,
    isCompleted: false,
    viewCount: 20,
    bookmarkCount: 32,
  },
];

export default MyPost;

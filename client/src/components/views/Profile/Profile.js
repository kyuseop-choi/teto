import React, { useCallback, useState } from "react";
import userAPI from "api/users";
import { withRouter } from "react-router-dom";
import {
  ProfileForm,
  LogoutButton,
  ProfileContainer,
  UpdateButton,
} from "./Profile.styles";
import { useDropzone } from "react-dropzone";

function Profile({ userObj, history }) {
  const [name, setName] = useState(userObj.name);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  //로그아웃 서버에 요청(토큰을 지움)
  const handleLogoutClick = () => {
    userAPI.logoutUser().then((response) => {
      if (response.data.success) {
        history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 1 || name.length > 20) {
      alert("이름은 1자 이상 20자 이하만 가능합니다.");
      return;
    }
    userAPI
      .updateProfile({ name })
      .then((response) => {
        if (response.data.success) {
          alert("업데이트 성공");
        } else {
          alert("업데이트 실패");
        }
      })
      .catch((err) => console.log(err));
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <ProfileContainer>
      <ProfileForm onSubmit={handleSubmit}>
        {/* <div {...getRootProps()}>
          <input style={{ border: "1px solid black" }} {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div> */}
        <label htmlFor="name">name</label>
        <input type="text" onChange={handleNameChange} value={name} id="name" />
        <label htmlFor="email">email</label>
        <input type="email" readOnly value={userObj.email} id="email" />
        <UpdateButton type="submit">Update Profile</UpdateButton>
        {/* 비밀번호 변경, 프로필 사진 변경... */}
      </ProfileForm>
      <LogoutButton onClick={handleLogoutClick}>로그아웃</LogoutButton>
    </ProfileContainer>
  );
}

export default withRouter(Profile);
// const mapStateToProps = (state, ownProps) => {
//   return { userObj: state.user.userData };
// };

// export default connect(mapStateToProps)(Profile);

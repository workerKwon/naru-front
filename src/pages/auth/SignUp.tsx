import React from "react"
import { useForm } from "react-hook-form" // react-hook-form을 사용하여 폼 데이터를 쉽게 관리
import { yupResolver } from "@hookform/resolvers/yup" // react-hook-form과 yup을 연결
import { signupSchema } from "../../validationSchemas" // yup으로 만든 유효성 검사 스키마
import axios from "axios" // 서버와의 HTTP 요청을 위한 라이브러리
import { useDispatch } from "react-redux"
import { login } from "../../store/auth/authSlice" // login action 가져오기
import "../../styles/SignUp.scss"

// 회원가입 폼에 입력될 데이터의 타입 정의
interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  // react-hook-form을 사용하여 폼 상태 관리
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signupSchema), // yup 스키마로 유효성 검사
  });

  const dispatch = useDispatch(); // Redux dispatch 함수

  // 폼 제출 시 실행될 함수
  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      // 서버에 회원가입 정보 전송
      const response = await axios.post('/api/signup', data);
      console.log(response.data); // 서버 응답 로그

      // 회원가입 성공 시 Redux 상태 업데이트
      dispatch(login({ username: data.username, email: data.email }));
    } catch (error) {
      console.error(error); // 에러 발생 시 로그
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
        
        {/* 사용자 이름 입력 필드 */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            {...register('username')} 
            className={`input ${errors.username ? 'input-error' : ''}`} 
            placeholder="Enter your username"
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>

        {/* 이메일 입력 필드 */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            {...register('email')} 
            className={`input ${errors.email ? 'input-error' : ''}`} 
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            {...register('password')} 
            className={`input ${errors.password ? 'input-error' : ''}`} 
            placeholder="Enter your password"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="btn-submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
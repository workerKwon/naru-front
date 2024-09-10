import React from "react"
import { useForm } from "react-hook-form" // react-hook-form을 사용하여 폼 데이터를 쉽게 관리
import { yupResolver } from "@hookform/resolvers/yup" // react-hook-form과 yup을 연결
import { signupSchema } from "../../validationSchemas" // yup으로 만든 유효성 검사 스키마
import axios from "axios" // 서버와의 HTTP 요청을 위한 라이브러리
import { useDispatch } from "react-redux"
import { login } from "../../store/auth/authSlice" // login action 가져오기

// 폼에 입력될 데이터 형식을 인터페이스로 정의
interface SignUpFormInputs {
  username: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  // useForm 훅을 사용하여 폼 상태 관리. yupResolver를 통해 yup 스키마와 연결
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signupSchema), // 유효성 검사를 yup으로 설정
  })

  const dispatch = useDispatch() // Redux dispatch 사용

  // 폼이 제출되었을 때 실행될 함수. 데이터는 onSubmit 함수에 전달됨
  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      // 서버로 회원가입 정보를 전송 (POST 요청)
      const response = await axios.post("/api/signup", data)
      console.log(response.data) // 서버에서 받은 응답 데이터를 콘솔에 출력

      // 회원가입 성공 시 사용자 정보를 Redux 상태에 저장
      dispatch(login({ username: data.username, email: data.email }))
    } catch (error) {
      console.error(error) // 에러 발생 시 콘솔에 출력
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 사용자 이름 입력 필드 */}
      <div>
        <label>Username</label>
        <input {...register("username")} />{" "}
        {/* register로 input 요소를 폼과 연결 */}
        <p>{errors.username?.message}</p>{" "}
        {/* 유효성 검사 실패 시 에러 메시지 출력 */}
      </div>
      {/* 이메일 입력 필드 */}
      <div>
        <label>Email</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      {/* 비밀번호 입력 필드 */}
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />{" "}
        {/* type="password"로 비밀번호 입력 */}
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">Sign Up</button> {/* 폼 제출 버튼 */}
    </form>
  )
}

export default SignUp

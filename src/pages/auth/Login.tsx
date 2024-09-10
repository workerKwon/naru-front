import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../validationSchemas" // 로그인용 유효성 검사 스키마
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../store/auth/authSlice" // login action 가져오기

// 로그인 폼에 입력될 데이터 형식을 정의
interface LoginFormInputs {
  email: string
  password: string
}

const Login: React.FC = () => {
  // useForm 훅을 사용하여 폼 상태 관리. yupResolver를 통해 yup 스키마와 연결
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema), // 유효성 검사를 yup으로 설정
  })

  const dispatch = useDispatch() // Redux dispatch 사용

  // 폼 제출 시 실행될 함수
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // 서버로 로그인 정보를 전송 (POST 요청)
      const response = await axios.post("/api/login", data)
      console.log(response.data) // 서버에서 받은 응답 데이터를 콘솔에 출력

      // 로그인 성공 시 사용자 정보를 Redux 상태에 저장
      dispatch(login({ username: "User", email: data.email }))
    } catch (error) {
      console.error(error) // 에러 발생 시 콘솔에 출력
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 이메일 입력 필드 */}
      <div>
        <label>Email</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>{" "}
        {/* 유효성 검사 실패 시 에러 메시지 출력 */}
      </div>
      {/* 비밀번호 입력 필드 */}
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">Login</button> {/* 폼 제출 버튼 */}
    </form>
  )
}

export default Login

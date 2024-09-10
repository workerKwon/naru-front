import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp" // 회원가입 페이지 컴포넌트
import Login from "./pages/Login" // 로그인 페이지 컴포넌트

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 회원가입 페이지 라우트 */}
        <Route path="/signup" element={<SignUp />} />
        {/* 로그인 페이지 라우트 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App

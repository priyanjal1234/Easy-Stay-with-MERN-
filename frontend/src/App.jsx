import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import VerifyEmail from './pages/VerifyEmail'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import Profile from './pages/Profile'
import AdminPanel from './pages/admin/AdminPanel'
import AddRoom from './pages/admin/AddRoom'
import RoomDetail from './pages/RoomDetail'
import PaymentOptions from './pages/PaymentOptions'
import CardPayment from './pages/CardPayment'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import RoomList from './pages/admin/RoomList'
import EditProfile from './pages/EditProfile'
import PaymentUpi from './pages/PaymentUpi'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/verify-email' element = {<VerifyEmail />} />
        <Route path='/profile' element = {<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path='/admin-panel' element = {<ProtectedRoute><AdminPanel /></ProtectedRoute>}/>
        <Route path='/add-room' element = {<AddRoom />}/>
        <Route path='/room-list' element = {<RoomList />}/>
        <Route path='/room/:id' element = {<ProtectedRoute><RoomDetail /></ProtectedRoute>}/>
        <Route path='/payment-options' element = {<PaymentOptions />}/>
        <Route path='/payment/card' element = {<CardPayment />}/>
        <Route path='/forgot-password' element = {<ForgotPassword />}/>
        <Route path='/reset-password/:token' element = {<ResetPassword />}/>
        <Route path='/edit-profile' element = {<EditProfile />}/>
        <Route path='/payment/upi' element = {<PaymentUpi />}/>
      </Routes>
    </div>
  )
}

export default App
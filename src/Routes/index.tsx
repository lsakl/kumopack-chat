import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom'

import SimpleChat from '../Views/SimpleChat/View'
import SupplierChat from '../Views/SupplierChat/View'
import RequireAuth from '../components/chat/service/RequireAuth'
import { CenterContextProvider } from '../components/chat/context/centerContext'
const { PUBLIC_URL } = process.env

const AppRoutes: React.FC = () => {
	return (
		<CenterContextProvider>
			<BrowserRouter basename={PUBLIC_URL}>
				<Routes>
					<Route
						element={
							<div className="container">
								<Outlet />
							</div>
						}>

						{/* Simple Chat */}
						<Route path='/chat/:userId' element={<RequireAuth><SimpleChat /></RequireAuth>} />

						{/* Supplier Chat */}
						<Route path="/supplier/:userId" element={<RequireAuth><SupplierChat /></RequireAuth>} />
					</Route>

					{/* 404 */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</CenterContextProvider>
	)
}

export default AppRoutes

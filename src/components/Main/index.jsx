import { Link } from "react-router-dom";
import "./main.css"


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (

		<main className="site-wrapper">
			<div className="pt-table desktop-768">
				<div
					className="pt-tablecell page-home relative"
					style={{
						backgroundImage: 'url(https://img4.thuthuatphanmem.vn/uploads/2020/06/05/hinh-nen-cong-nghe-don-gian-ma-dep_103228946.jpg)',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
					}}
				>
					<div className="overlay"></div>

					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
								<div className="page-title home text-center">
									<span className="heading-page">Welcome to Home Page</span>
									<p className="mt20">Phần mềm tiện ích văn phòng, sáng kiến phòng Kế Hoạch- Đầu Tư Mobifone.</p>
								</div>

								<div className="hexagon-menu clear">
									{/* Hexagon items with Font Awesome icons */}

									<div className="hexagon-item">
										<div className="hex-item">
											<div></div>
											<div></div>
											<div></div>
										</div>
										<div className="hex-item">
											<div></div>
											<div></div>
											<div></div>
										</div>
										<div className="hex-content">
											<span className="hex-content-inner">
												<span className="icon">
													<i className="fas fa-universal-access"></i>
												</span>
												<span className="title">Welcome</span>
											</span>
											<svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
												<path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
											</svg>
										</div>
									</div>


									<Link to="/todo">
										<div className="hexagon-item">
											<div className="hex-item">
												<div></div>
												<div></div>
												<div></div>
											</div>
											<div className="hex-item">
												<div></div>
												<div></div>
												<div></div>
											</div>
											<div className="hex-content">
												<span className="hex-content-inner">
													<span className="icon">
														<i className="fas fa-universal-access"></i>
													</span>
													<span className="title">Reminder Working</span>
												</span>
												<svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
													<path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
												</svg>
											</div>

										</div>
									</Link>
									<Link to="/absent">
										<div className="hexagon-item">
											<div className="hex-item">
												<div></div>
												<div></div>
												<div></div>
											</div>
											<div className="hex-item">
												<div></div>
												<div></div>
												<div></div>
											</div>
											<div className="hex-content">
												<span className="hex-content-inner">
													<span className="icon">
														<i className="fas fa-universal-access"></i>
													</span>
													<span className="title">Absent</span>
												</span>
												<svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
													<path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
												</svg>
											</div>

										</div>
									</Link>

									<div className="hexagon-item">
										<div className="hex-item">
											<div></div>
											<div></div>
											<div></div>
										</div>
										<div className="hex-item">
											<div></div>
											<div></div>
											<div></div>
										</div>
										<div className="hex-content">
											<span className="hex-content-inner">
												<span className="icon">
													<i className="fas fa-universal-access"></i>
												</span>
												<button className="title" onClick={handleLogout}>LogOut</button>
											</span>
											<svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
												<path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
											</svg>
										</div>

									</div>
									{/* Repeat similar structure for other hexagon items */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>


	);
};

export default Main;

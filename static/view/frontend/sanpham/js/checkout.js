$(function () {
	
	$('.js_ship input[type=radio]').change(function () {
		phiship = 0;
		if ($('#tt2').is(":checked")) {
			$('.thongtinchuyenkhoan').slideDown();
		} else {
			$('.thongtinchuyenkhoan').slideUp();
		}
		if ($('#tt3').is(":checked")) {
			$('#tienship').val(phiship);
			$('.thongtindiachi').slideDown();
			phiship;
			updateThanhToan();
		} else {
			$('.thongtindiachi').slideUp();
			phiship = $('.checkout-tongtien .phiship').text();
			phiship = parseInt((phiship).replace(/\./g, ""));
			$('#tienship').val(phiship);
			updateThanhToan();
			// alert(phiship);
		}
	});
	
	function updateThanhToan() {
		tiengiamgia = 0;
		// if (giasi == 0)
		//     tiengiamgia = parseInt(($('#tiengiamgia').text()).replace(/\./g, ""));
		
		$('#tienthanhtoan').html(tien((parseInt(($('#tientongcong').text()).replace(/\./g, "")) - tiengiamgia + phiship + parseInt($('#selectPhiVC option:selected').data('phi'))).toString()) + ' ₫');
		$('#checkout-tongcong').html(tien((parseInt(($('#tientongcong').text()).replace(/\./g, "")) - tiengiamgia + phiship + parseInt($('#selectPhiVC option:selected').data('phi'))).toString()) + ' ₫');
		$('.total-new').html(tien((parseInt(($('#tientongcong').text()).replace(/\./g, "")) - tiengiamgia + phiship + parseInt($('#selectPhiVC option:selected').data('phi'))).toString()) + ' ₫');
	}
	
	
	laphoadon = false;
	
	$('.button-changeQuantity').click(function () {
		type = $(this).attr("data-type");
		parentInput = $(this).parent().find('.input-changeQuantity');
		slhientai = parseInt(parentInput.val());
		if (type == 1)
			slmoi = slhientai + 1;
		else
			slmoi = slhientai - 1;
		if (slmoi > 0 && !isNaN(slmoi)) {
			parentInput.prop("value", slmoi);
		} else
			parentInput.prop("value", slhientai);
	});
	
	$(document).on("click", ".button-changeQuantity", function () {
		if (!laphoadon) {
			item = $(this);
			key = $(this).attr("data-key");
			
			inputTotal = $(this).parents('.checkout-item--quantity').next('.checkout-item--totalprice');
			soluongthem = parseInt($(this).parent().find('.input-changeQuantity').val());
			console.log(soluongthem);
			item.parent().find($('.button-changeQuantity')).prop('disabled', true);
			item.parent().find($('.input-changeQuantity')).prop('disabled', true);
			
			if (soluongthem > 0) {
				soluongsanpham = datagiohang[key].soluongsanpham;
				if (soluongthem <= soluongsanpham) {
					// dangload();
					var formdata = new FormData();
					formdata.append("key", key);
					formdata.append("soluongthem", soluongthem);
					formdata.append("token", token);
					var http = new XMLHttpRequest();
					http.open("POST", URL_ROOT + "checksum/createchecksum", true);
					http.onreadystatechange = function (event) {
						if (http.readyState == 4 && http.status == 200) {
							var ketqua = JSON.parse(http.responseText);
							if (ketqua.tinhtrang == 1) {
								token = ketqua.token;
								var checksum = ketqua.checksum;
								formdata.append("checksum", checksum);
								http = new XMLHttpRequest();
								http.open("POST", URL_ROOT + "sanpham/capnhatgiohang", true);
								http.onreadystatechange = function (event) {
									if (http.readyState == 4 && http.status == 200) {
										o = JSON.parse(http.responseText);
										if (o.tinhtrang == 1) {
											
											item.parent().find($('.button-changeQuantity')).prop('disabled', false);
											item.parent().find($('.input-changeQuantity')).prop('disabled', false);
											
											inputTotal.html(format1(parseInt(o.tiensanpham[key]), '') + '<sup> ₫</sup>');
											$('#totalCheckout').html(format1(parseInt(o.tientotal), '') + '<sup> ₫</sup>');
											
											$('.soluongCheckout').text(o.soluongthem);
											
											datagiohang[key].soluongthem = soluongthem;
											// loadthanhcong();
											
											$('.soluong-giohang').text(o.soluonggiohang);
											$('.tien-giohang').html(format1(parseInt(o.tientotal), '') + '<sup> ₫</sup>');
											
											if (soluongthem == 1) {
												item.parent().find($('.button-changeQuantity[data-type="2"]')).prop('disabled', true);
											} else {
												item.parent().find($('.button-changeQuantity:disabled')).prop('disabled', false);
											}
										} else {
											window.location.reload();
										}
									}
									$('#btnMaGiamGia').click();
								};
								http.send(formdata);
							} else alert("Lỗi xác thực! Vui lòng tải lại trang");
						}
					};
					http.send(formdata);
				} else {
					alert("Sản phẩm này chỉ còn " + soluongsanpham + " sản phẩm");
					$(this).parent().parent().find('input').prop("value", datagiohang[key].soluongthem);
					item.parent().find($('.button-changeQuantity')).prop('disabled', false);
					item.parent().find($('.input-changeQuantity')).prop('disabled', false);
				}
// Nếu > 0
			} else {
				alert("Số lượng phải > 0");
				item.parent().find($('.button-changeQuantity')).prop('disabled', false);
				item.parent().find($('.input-changeQuantity')).prop('disabled', false);
			}
		}
	});
	
	$(document).on('change', ".input-changeQuantity", function () {
		if (!laphoadon) {
			item = $(this);
			key = $(this).attr("data-key");
			
			inputTotal = $(this).parents('.checkout-item--quantity').next('.checkout-item--totalprice');
			soluongthem = parseInt($(this).parent().find('.input-changeQuantity').val());
			
			item.parent().find($('.button-changeQuantity')).prop('disabled', true);
			item.parent().find($('.input-changeQuantity')).prop('disabled', true);
			
			if (soluongthem > 0) {
				
				soluongsanpham = datagiohang[key].soluongsanpham;
				if (soluongthem <= soluongsanpham) {
					// dangload();
					var formdata = new FormData();
					formdata.append("key", key);
					formdata.append("soluongthem", soluongthem);
					formdata.append("token", token);
					var http = new XMLHttpRequest();
					http.open("POST", URL_ROOT + "checksum/createchecksum", true);
					http.onreadystatechange = function (event) {
						if (http.readyState == 4 && http.status == 200) {
							var ketqua = JSON.parse(http.responseText);
							if (ketqua.tinhtrang == 1) {
								token = ketqua.token;
								var checksum = ketqua.checksum;
								formdata.append("checksum", checksum);
								http = new XMLHttpRequest();
								http.open("POST", URL_ROOT + "sanpham/capnhatgiohang", true);
								http.onreadystatechange = function (event) {
									if (http.readyState == 4 && http.status == 200) {
										o = JSON.parse(http.responseText);
										if (o.tinhtrang == 1) {
											
											item.parent().find($('.button-changeQuantity')).prop('disabled', false);
											item.parent().find($('.input-changeQuantity')).prop('disabled', false);
											
											inputTotal.html(format1(parseInt(o.tiensanpham[key]), '') + '<sup> ₫</sup>');
											$('#totalCheckout').html(format1(parseInt(o.tientotal), '') + '<sup> ₫</sup>');
											$('.soluongCheckout').text(o.soluongthem);
											
											datagiohang[key].soluongthem = soluongthem;
											// loadthanhcong();
											
											$('.soluong-giohang').text(o.soluonggiohang);
											$('.tien-giohang').html(format1(parseInt(o.tientotal), ''));
											
											if (soluongthem == 1) {
												item.parent().find($('.button-changeQuantity[data-type="2"]')).prop('disabled', true);
											} else {
												item.parent().find($('.button-changeQuantity:disabled')).prop('disabled', false);
											}
											
										} else {
											window.location.reload();
										}
									}
									$('#btnMaGiamGia').click();
								};
								http.send(formdata);
							} else {
								alert("Lỗi xác thực! Vui lòng tải lại trang");
								item.parent().find($('.button-changeQuantity')).prop('disabled', false);
								item.parent().find($('.input-changeQuantity')).prop('disabled', false);
							}
						}
					};
					http.send(formdata);
				} else {
					alert("Sản phẩm này chỉ còn " + soluongsanpham + " sản phẩm");
					$(this).parent().parent().find('input').prop("value", datagiohang[key].soluongthem);
					item.parent().find($('.button-changeQuantity')).prop('disabled', false);
					item.parent().find($('.input-changeQuantity')).prop('disabled', false);
				}
// Nếu > 0
			} else {
				alert("Số lượng phải > 0");
				
				item.parent().find($('.button-changeQuantity')).prop('disabled', false);
				item.parent().find($('.input-changeQuantity')).prop('disabled', false);
			}
		}
	});
	
	$(document).on("click", "#delete_Product", function () {
		if (!laphoadon) {
			var x;
			item = $(this);
			key = $(this).attr("data-key");
			
			var formdata = new FormData();
			formdata.append("key", key);
			formdata.append("token", token);
			formdata.append("checkout", true);
			var http = new XMLHttpRequest();
			http.open("POST", URL_ROOT + "checksum/createchecksum", true);
			http.onreadystatechange = function (event) {
				if (http.readyState == 4 && http.status == 200) {
					var ketqua = JSON.parse(http.responseText);
					if (ketqua.tinhtrang == 1) {
						token = ketqua.token;
						var checksum = ketqua.checksum;
						formdata.append("checksum", checksum);
						http = new XMLHttpRequest();
						http.open("POST", URL_ROOT + "sanpham/xoagiohang", true);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								o = JSON.parse(http.responseText);
								if (o.tinhtrang == 1) {
									$('#totalCheckout').html(format1(parseInt(o.tientotal), '') + '<sup> ₫</sup>');
									$('.soluongCheckout').text(o.soluongthem);
									item.parents('#itemKey' + key).fadeOut(function () {
										$(this).remove();
									});
									$('.soluong-giohang').text(o.soluonggiohang);
									$('.tien-giohang').html(format1(parseInt(o.tientotal), 'đ') + '<sup> ₫</sup>');
									call_toastr("Xoá sản phẩm trong giỏ hàng thành công", 'success');
									
									if (o.sl == 0) {
										setTimeout(function () {
											window.location.reload();
										}, 1000);
									}
									
								} else {
									window.location.reload();
								}
							}
							$('#btnMaGiamGia').click();
						};
						http.send(formdata);
					}
				}
			};
			http.send(formdata);
			// }
		}
	});
	
	$("#frmPayment").submit(function () {
		// submitHandler: function (form) {
		giatien = $("#buttonPayment").attr("data-tongtien");
		giatientoithieu = $("#buttonPayment").attr("data-giatientoithieu");
		
		if (parseFloat(giatien) < parseFloat(giatientoithieu)) {
			$(".error-total").show();
			return false;
		} else {
			if (!laphoadon) {
				curren = $("#buttonPayment ");
				
				if (ngonngu === 1) {
					btnlinkload(curren, "Vui lòng chờ");
				} else {
					btnlinkload(curren, "Please wait");
				}
				
				var timeout = new Array();
				
				timeout[0] = setTimeout(function () {
					if (ngonngu === 1) {
						btnlinkload(curren, "Đang kiểm tra dữ liệu");
					} else {
						btnlinkload(curren, "Checking data");
					}
				}, 1000);
				timeout[1] = setTimeout(function () {
					if (ngonngu === 1) {
						btnlinkload(curren, "Đang xử lý dữ liệu");
					} else {
						btnlinkload(curren, "Processing data");
					}
				}, 2000);
				timeout[2] = setTimeout(function () {
					if (ngonngu === 1) {
						btnlinkload(curren, "Đang gửi dữ liệu");
					} else {
						btnlinkload(curren, "Sending data");
					}
				}, 3000);
				timeout[3] = setTimeout(function () {
					if (ngonngu === 1) {
						btnlinkload(curren, "Đang tạo đơn hàng...");
					} else {
						btnlinkload(curren, "Sending data");
					}
				}, 4000);
				
				Form = document.querySelector("#frmPayment");
				var formdata = new FormData(Form);
				formdata.append("token", token);
				var http = new XMLHttpRequest();
				http.open("POST", URL_ROOT + "checksum/createchecksum", true);
				http.onreadystatechange = function (event) {
					if (http.readyState == 4 && http.status == 200) {
						var ketqua = JSON.parse(http.responseText);
						if (ketqua.tinhtrang == 1) {
							token = ketqua.token;
							var checksum = ketqua.checksum;
							formdata.append("checksum", checksum);
							http = new XMLHttpRequest();
							http.open("POST", URL_ROOT + "sanpham/laphoadon", true);
							http.onreadystatechange = function (event) {
								if (http.readyState == 4 && http.status == 200) {
									var o = JSON.parse(http.responseText);
									
									if (o.tinhtrang == 1) {
										// Lập hóa đơn thành công
										$(".frmcheckout input, .frmcheckout textarea").prop("disabled",true);
										url = URL_ROOT + "invoice?mahoadon=" + o.mahoadon + "&token=" + o.token;
										setTimeout(function () {
											if (ngonngu === 1) {
												btnlinkthanhcong(curren, "Đặt hàng thành công");
												$(".thongbao")
													.html(
														"Hóa đơn đã được tạo thành công! <br> Chúng tôi sẽ gọi lại cho bạn trong thời gian sớm nhất! <br> Mã hóa đơn của bạn: " +
														o.mahoadon +
														" <br>\n" +
														"Nhấp vào xem hóa đơn và lưu địa chỉ để theo dõi hóa đơn của bạn<br><a class='btn btn-success bg-gradient' target='_blank' href='" +
														url +
														"'> Xem hóa đơn </a><br/><a class='buttonhome' target='_blank' href='" +
														URL_ROOT +
														"'> Tiếp tục mua hàng </a>"
													)
													.addClass("alert-success")
													.show();
											} else {
												btnlinkthanhcong(curren, "Create a successful order");
												$(".thongbao")
													.html(
														"Invoice was created successfully! <br> We will call you backin the shortest time! <br> Your invoice code is: " +
														o.mahoadon +
														" <br>Click go to the invoice view and save the address to track your invoice<br><a class='btn btn-primary' target='_blank' href='" +
														url +
														"'> SEE THE BILL </a><br/><a class='buttonhome' target='_blank' href='" +
														URL_ROOT +
														"'> Continue buying </a>"
													)
													.addClass("alert-success")
													.show();
											}
										}, 500);
										if (o.url != '') {
											window.location.href = o.url;
										}
										$(".badge-cart").text("0");
										curren.prop("disabled", true);
										if (o.reload == 1) {
											window.location.reload();
										}
									} else {
										timeout.forEach(function (e) {
											clearTimeout(e);
										});
										if (o.tinnhan == "reload") window.location.reload();
										else {
											laphoadon = false;
											btnlinkthanhcong(curren, "Đặt hàng");
											$(".frmcheckout input, .frmcheckout textarea").prop(
												"disabled",
												false
											);
											html = "Billing failed: <hr>";
											i = 1;
											for (var key in o.tinnhan) {
												var obj = o.tinnhan[key];
												html += i + "/ " + obj + "<hr>";
												i++;
											}
											// $(".thongbao").html(html).css("display", "block");
											call_toastr(o.tinnhan, 'error');
										}
									}
								}
							};
							http.send(formdata);
						} else alert("Validation error! Please reload the page");
					}
				};
				http.send(formdata);
			}
			return false;
		}
	});
})
$(document).ready(function () {
	
	$('.thongbaochitiet').hide();
//     $(document).on('click', '.btn-add-cart', function () {
//         curren = $(this);
//         id_sanpham = curren.attr("data-id");
//         tensanpham = curren.attr("data-tensanpham");
//         masanpham = curren.attr("data-masanpham");
//         giamgia = curren.attr("data-giamgia");
//         giasanpham = curren.attr("data-giasanpham");
//         if (khsi)
//             giasisanpham = curren.attr("data-giasisanpham");
//         soluongsanpham = curren.attr("data-soluongsanpham");
//         hinhsanpham = curren.attr("data-hinhsanpham");
//         cannang = curren.attr("data-cannang");
//         tontai = false;
//         datasanphamchitiet = new Array();
//         thuoctinhchon = Array();
//         listthuoctinhchon = new Array();
//         $totalthuoctinhchon = $('.listgiatri').length;
//
//         // san pham chi tiet
//         sogiatri = 0;
//         if(typeof sanphamchitiet !== 'undefined'){
//             for (var key in sanphamchitiet) {
//
//                 datasanphamchitiet.push(sanphamchitiet[key]);
//                 temp = sanphamchitiet[key]['thuoctinh'].length;
//                 for ($i = 0; $i < temp; $i++) {
//                     thuoctinhchon.push(sanphamchitiet[key]['thuoctinh'][$i]);
//                 }
//                 if (temp > sogiatri)
//                     sogiatri = temp;
//             }
//         }
//
//         if (datasanphamchitiet == '' || datasanphamchitiet == null) {
//             $('.listgiatri').each(function () {
//                 itemcheck = $(this).find(":input:first").prop("checked", true);
//
//                 $(this).find(":input").each(function () {
//                     listthuoctinhchon.push($(this).val());
//                 })
//             })
//         } else {
//
//             $('.listgiatri').each(function () {
//                 itemcheck = $(this).find(":input").prop("checked", false);
//                 $(this).find(":input").each(function () {
//                     listthuoctinhchon.push($(this).val());
//                 })
//             })
//         }
//
// // end
//         if (datasanphamchitiet != '' && datasanphamchitiet != null) {
//             $totaldachon = $(".giatrithuoctinhchon:checked").length;
//
//             if (tontai && ($totaldachon == $totalthuoctinhchon)) {
//
//                 // Đã hoàn thành và tiến hành đặt hàng
//
//                 soluongthem = $(":input[name=soluongthem]").val();
//
//                 if (parseInt(soluongthem) <= parseInt(soluongsanpham) && parseInt(soluongthem) > 0) {
//                     var loithuoctinh = false;
//                     giatri = new Array();
//                     $(".giatrithuoctinhchon:checked").each(function () {
//                         if (in_array($(this).val(), listthuoctinhchon)) {
//                             giatri.push($(this).val());
//                         } else {
// 	                        call_toastr("Có lỗi xảy ra! Vui lòng tải lại trang", 'error');
//                             loithuoctinh = true;
//                         }
//                     });
//                     if (!loithuoctinh) {
//                         giatri = giatri.toString();
//
//                         btnlinkload(curren);
//                         var formdata = new FormData();
//                         formdata.append("id_sanpham", id_sanpham);
//                         formdata.append("id_sanphamchitiet", id_sanphamchitiet);
//                         formdata.append("soluongthem", soluongthem);
//                         formdata.append("giatri", giatri);
//                         formdata.append("token", token);
//                         var http = new XMLHttpRequest();
//                         http.open("POST", URL_ROOT + "checksum/createchecksum", true);
//                         http.send(formdata);
//                         http.onreadystatechange = function (event) {
//                             if (http.readyState == 4 && http.status == 200) {
//                                 var ketqua = JSON.parse(http.responseText);
//                                 if (ketqua.tinhtrang == 1) {
//                                     token = ketqua.token;
//                                     var checksum = ketqua.checksum;
//                                     formdata.append("checksum", checksum);
//                                     http = new XMLHttpRequest();
//                                     http.open("POST", URL_ROOT + "sanpham/themgiohang", true);
//                                     http.onreadystatechange = function (event) {
//                                         if (http.readyState == 4 && http.status == 200) {
//                                             ketqua = JSON.parse(http.responseText);
//                                             if (ketqua.tinhtrang == 1) {
//                                                 capnhatgiohang(ketqua);
//                                                 // bỏ
//                                                 // btnlinkthanhcong(curren, "Thành công");
//                                                 $(this).attr("disabled", 'disabled');
// 	                                            btnlinkthanhcong(curren, "<i class='fal fa-shopping-cart'></i> Thêm vào giỏ");
// 	                                            call_toastr("Thêm sản phẩm vào giỏ hàng thành công", 'success');
//                                             } else
//                                                 btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
//                                         }
//                                     };
//                                     http.send(formdata);
//                                 } else {
//                                     btnlinkthanhcong(curren, "Lỗi xác thực! Vui lòng tải lại trang");
//                                 }
//                             }
//                         }
//                     }
//                 } else {
// 	                call_toastr(`Sản phẩm này chỉ còn lại ${soluongsanpham} sản phẩm, vui lòng liên hệ ${SDT} để dược tư vấn thêm`, 'error');
//                 }
//             } else {// Thông báo chọn
//
//                 $('.listgiatri').each(function () {
//                     label = $(this).attr("data-label");
//                     itemcheck = $(this).find(":checked");
//
//                     if (!itemcheck.prop("checked")) {
//                         chuachon = false;
// 	                    call_toastr(`Vui lòng chọn ${label}`, 'error');
//                     }
//                 });
//             }
//         } else {
//             var loithuoctinh = false;
//             chuachon = true;
//             $('.listgiatri').each(function () {
//                 label = $(this).attr("data-label");
//                 itemcheck = $(this).find(":checked");
//
//                 if (!itemcheck.prop("checked")) {
//                     chuachon = false;
// 	                call_toastr(`Vui lòng chọn ${label}`, 'error');
//                 }
//             });
//
//             if (chuachon) {
//                 giatri = new Array();
//                 $(".giatrithuoctinhchon:checked").each(function () {
//                     if (in_array($(this).val(), listthuoctinhchon)) {
//                         giatri.push($(this).val());
//                     } else {
// 	                    call_toastr("Có lỗi xảy ra! Vui lòng tải lại trang", 'error');
//                         loithuoctinh = true;
//                     }
//                 });
//                 giatri = giatri.toString();
//
//                 if (!loithuoctinh) {
//                     // Giá trị mặc định nếu không có thuộc tính chọn
//                     // soluongthem = $(":input[name=soluongthem]").val();
//
//
//                     if (!$(":input[name=soluongthem]").val()) {
//                         soluongthem = '1';
//                     } else {
//                         soluongthem = $(":input[name=soluongthem]").val()
//                     }
//
//                     if (parseInt(soluongthem) <= parseInt(soluongsanpham)) {
//                         // console.log($(this));
//                         var formdata = new FormData();
//                         formdata.append("id_sanpham", id_sanpham);
//                         formdata.append("id_sanphamchitiet", -1);
//                         formdata.append("soluongthem", soluongthem);
//                         formdata.append("giatri", giatri);
//                         formdata.append("token", token);
//                         var http = new XMLHttpRequest();
//                         http.open("POST", URL_ROOT + "checksum/createchecksum", true);
//                         http.send(formdata);
//                         http.onreadystatechange = function (event) {
//                             if (http.readyState == 4 && http.status == 200) {
//                                 var ketqua = JSON.parse(http.responseText);
//                                 if (ketqua.tinhtrang == 1) {
//                                     token = ketqua.token;
//                                     var checksum = ketqua.checksum;
//                                     formdata.append("checksum", checksum);
//                                     http = new XMLHttpRequest();
//                                     http.open("POST", URL_ROOT + "sanpham/themgiohang", true);
//                                     http.onreadystatechange = function (event) {
//                                         if (http.readyState == 4 && http.status == 200) {
//                                             ketqua = JSON.parse(http.responseText);
//                                             if (ketqua.tinhtrang == 1) {
//                                                 capnhatgiohang(ketqua);
//                                                 // if(curren.hasClass('btn-detail')) {
//                                                 //     btnlinkthanhcong(curren, "Thành công");
//                                                 // } else {
//                                                 //     btnlinkthanhcong(curren, "<i class='fad fa-check'>");
//                                                 // }
// 	                                            btnlinkthanhcong(curren, "<i class='fal fa-shopping-cart'></i> Thêm vào giỏ");
// 	                                            call_toastr("Thêm sản phẩm vào giỏ hàng thành công", 'success');
//                                                 curren.attr("disabled", 'disabled');
//                                             } else
//                                                 btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
//                                         }
//                                     };
//                                     http.send(formdata);
//                                 } else btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
//                             }
//                         }
//                     } else
// 	                    call_toastr(`Sản phẩm này chỉ còn lại ${soluongsanpham} sản phẩm`, 'error');
//                     $(this).parent().prev().find('input').prop("value", soluongthem);
//                     ;
//                 }
//             }
//         }
//         return false;
//     });
	
	$(document).on("click", ".btn-add-cart", function () {
		curren = $(this);
		id_sanpham = curren.attr("data-id");
		tensanpham = curren.attr("data-tensanpham");
		masanpham = curren.attr("data-masanpham");
		giamgia = curren.attr("data-giamgia");
		giasanpham = curren.attr("data-giasanpham");
		soluongsanpham = curren.attr("data-soluongsanpham");
		if (typeof giasanpham_thuoctinh !== "undefined" && giasanpham_thuoctinh != 0) {
			giasanpham = giasanpham_thuoctinh;
		}
		if (typeof giamgia_thuoctinh !== "undefined" && giamgia != 0) {
			giamgia = giamgia_thuoctinh;
		}
		
		if (typeof soluongsanpham_thuoctinh !== "undefined" && soluongsanpham_thuoctinh != 0) {
			soluongsanpham = soluongsanpham_thuoctinh;
		}
		
		btnlinkload(curren);
		if (typeof khsi !== null) giasisanpham = curren.attr("data-giasisanpham");
		hinhsanpham = curren.attr("data-hinhsanpham");
		cannang = curren.attr("data-cannang");
		
		$totalthuoctinhchon = $(".listgiatri").length;
		// end
		if (datasanphamchitiet != "" && datasanphamchitiet != null) {
			$totaldachon = $(".giatrithuoctinhchon:checked").length;
			
			if (tontai && $totaldachon == $totalthuoctinhchon) {
				// Đã hoàn thành và tiến hành đặt hàng
				soluongthem = $(":input[name=soluongthem]").val();
				if (parseInt(soluongthem) <= parseInt(soluongsanpham) && parseInt(soluongthem) > 0) {
					var loithuoctinh = false;
					giatri = new Array();
					$(".giatrithuoctinhchon:checked").each(function () {
						if (in_array($(this).val(), listthuoctinhchon)) {
							giatri.push($(this).val());
						} else {
							alert("Có lỗi xảy ra! Vui lòng tải lại trang");
							loithuoctinh = true;
						}
					});
					if (!loithuoctinh) {
						giatri = giatri.toString();
						
						var formdata = new FormData();
						formdata.append("id_sanpham", id_sanpham);
						formdata.append("id_sanphamchitiet", id_sanphamchitiet);
						formdata.append("soluongthem", soluongthem);
						formdata.append("giatri", giatri);
						formdata.append("giatien", giasanpham);
						formdata.append("giamgia", giamgia);
						formdata.append("token", token);
						var http = new XMLHttpRequest();
						http.open("POST", URL_ROOT + "checksum/createchecksum", true);
						http.send(formdata);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								var ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									token = ketqua.token;
									var checksum = ketqua.checksum;
									formdata.append("checksum", checksum);
									http = new XMLHttpRequest();
									http.open("POST", URL_ROOT + "sanpham/themgiohang", true);
									http.onreadystatechange = function (event) {
										if (http.readyState == 4 && http.status == 200) {
											ketqua = JSON.parse(http.responseText);
											if (ketqua.tinhtrang == 1) {
												capnhatgiohang(ketqua);
												btnlinkthanhcong(curren, "<i class='fal fa-shopping-cart'></i> Giỏ hàng");
												call_toastr("Thêm sản phẩm vào giỏ hàng thành công", 'success');
											} else
												btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
										}
									};
									http.send(formdata);
								} else {
									btnlinkthanhcong(curren, "Lỗi xác thực! Vui lòng tải lại trang");
								}
							}
						};
					}
				} else {
					alert("Sản phẩm này chỉ còn lại " + soluongsanpham + " sản phẩm, vui lòng liên hệ " + SDT + " để dược tư vấn thêm");
				}
			} else {
				// Thông báo chọn
				$(".listgiatri").each(function () {
					label = $(this).attr("data-label");
					itemcheck = $(this).find("input:checked");
					
					if (!itemcheck.prop("checked")) {
						chuachon = false;
						// alert("Vui lòng chọn " + label);
						call_toastr("Vui lòng chọn " + label, 'error');
						btnlinkthanhcong(curren, "<i class='fal fa-shopping-cart'></i> Giỏ hàng");
					}
				});
			}
		} else {
			var loithuoctinh = false;
			chuachon = true;
			// $('.listgiatri').each(function () {
			//     label = $(this).attr("data-label");
			//     itemcheck = $(this).find(":checked");
			//     if (!itemcheck.prop("checked")) {
			//         chuachon = false;
			//         alert("Vui lòng chọn " + label);
			//     }
			// });
			
			if (chuachon) {
				giatri = new Array();
				$(".giatrithuoctinhchon:checked").each(function () {
					if (in_array($(this).val(), listthuoctinhchon)) {
						giatri.push($(this).val());
					} else {
						alert("Có lỗi xảy ra! Vui lòng tải lại trang");
						loithuoctinh = true;
					}
				});
				giatri = giatri.toString();
				
				if (!loithuoctinh) {
					// Giá trị mặc định nếu không có thuộc tính chọn
					// soluongthem = $(":input[name=soluongthem]").val();
					
					if (!$(":input[name=soluongthem]").val()) {
						soluongthem = "1";
					} else {
						soluongthem = $(":input[name=soluongthem]").val();
					}
					
					if (parseInt(soluongthem) <= parseInt(soluongsanpham)) {
						var formdata = new FormData();
						formdata.append("id_sanpham", id_sanpham);
						formdata.append("id_sanphamchitiet", -1);
						formdata.append("soluongthem", soluongthem);
						formdata.append("giatri", giatri);
						formdata.append("giatien", giasanpham);
						formdata.append("giamgia", giamgia);
						formdata.append("token", token);
						var http = new XMLHttpRequest();
						http.open("POST", URL_ROOT + "checksum/createchecksum", true);
						http.send(formdata);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								var ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									token = ketqua.token;
									var checksum = ketqua.checksum;
									formdata.append("checksum", checksum);
									http = new XMLHttpRequest();
									http.open("POST", URL_ROOT + "sanpham/themgiohang", true);
									http.onreadystatechange = function (event) {
										if (http.readyState == 4 && http.status == 200) {
											ketqua = JSON.parse(http.responseText);
											if (ketqua.tinhtrang == 1) {
												capnhatgiohang(ketqua);
												btnlinkthanhcong(curren, "<i class='fal fa-shopping-cart'></i> Giỏ hàng");
												call_toastr("Thêm sản phẩm vào giỏ hàng thành công", 'success');
											} else
												btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
										}
									};
									http.send(formdata);
								} else
									btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
							}
						};
					} else
						alert("Sản phẩm này chỉ còn lại " + soluongsanpham + " sản phẩm");
					$(this).parent().prev().find("input").prop("value", soluongthem);
				}
			}
		}
		return false;
	});
	
	
	$('.btn-add-cart-muangay').click(function () {
		curren = $(this);
		
		id_sanpham = curren.attr("data-id");
		tensanpham = curren.attr("data-tensanpham");
		masanpham = curren.attr("data-masanpham");
		giamgia = curren.attr("data-giamgia");
		giasanpham = curren.attr("data-giasanpham");
		if (khsi)
			giasisanpham = curren.attr("data-giasisanpham");
		soluongsanpham = curren.attr("data-soluongsanpham");
		hinhsanpham = curren.attr("data-hinhsanpham");
		cannang = curren.attr("data-cannang");
		tontai = false;
		datasanphamchitiet = new Array();
		thuoctinhchon = Array();
		listthuoctinhchon = new Array();
		$totalthuoctinhchon = $('.listgiatri').length;
		
		
		// san pham chi tiet
		sogiatri = 0;
		for (var key in sanphamchitiet) {
			
			datasanphamchitiet.push(sanphamchitiet[key]);
			temp = sanphamchitiet[key]['thuoctinh'].length;
			for ($i = 0; $i < temp; $i++) {
				thuoctinhchon.push(sanphamchitiet[key]['thuoctinh'][$i]);
			}
			if (temp > sogiatri)
				sogiatri = temp;
		}
		
		if (datasanphamchitiet == '' || datasanphamchitiet == null) {
			$('.listgiatri').each(function () {
				itemcheck = $(this).find(":input:first").prop("checked", true);
				
				$(this).find(":input").each(function () {
					listthuoctinhchon.push($(this).val());
				})
			})
		} else {
			
			$('.listgiatri').each(function () {
				itemcheck = $(this).find(":input").prop("checked", false);
				$(this).find(":input").each(function () {
					listthuoctinhchon.push($(this).val());
				})
			})
		}

// end
		if (datasanphamchitiet != '' && datasanphamchitiet != null) {
			$totaldachon = $(".giatrithuoctinhchon:checked").length;
			
			if (tontai && ($totaldachon == $totalthuoctinhchon)) {
				// Đã hoàn thành và tiến hành đặt hàng
				soluongthem = $(":input[name=soluongthem]").val();
				if (parseInt(soluongthem) <= parseInt(soluongsanpham) && parseInt(soluongthem) > 0) {
					var loithuoctinh = false;
					giatri = new Array();
					$(".giatrithuoctinhchon:checked").each(function () {
//         var jsonArg1 = new Object();
//        jsonArg1.giatri = $(this).val();
//        //jsonArg1.ten=$(this).attr("data-name");
						if (in_array($(this).val(), listthuoctinhchon)) {
							giatri.push($(this).val());
						} else {
							call_toastr("Có lỗi xảy ra! Vui lòng tải lại trang", 'error');
							loithuoctinh = true;
						}
					});
					if (!loithuoctinh) {
						giatri = giatri.toString();
						
						btnlinkload(curren);
						var formdata = new FormData();
						formdata.append("id_sanpham", id_sanpham);
						formdata.append("id_sanphamchitiet", -1);
						formdata.append("soluongthem", soluongthem);
						formdata.append("giatri", giatri);
						formdata.append("giatien", giasanpham);
						formdata.append("giamgia", giamgia);
						formdata.append("token", token);
						var http = new XMLHttpRequest();
						http.open("POST", URL_ROOT + "checksum/createchecksum", true);
						http.send(formdata);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								var ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									token = ketqua.token;
									var checksum = ketqua.checksum;
									formdata.append("checksum", checksum);
									http = new XMLHttpRequest();
									http.open("POST", URL_ROOT + "sanpham/themgiohang", true);
									http.onreadystatechange = function (event) {
										if (http.readyState == 4 && http.status == 200) {
											ketqua = JSON.parse(http.responseText);
											if (ketqua.tinhtrang == 1) {
												window.location.href = URL_ROOT + "sanpham/checkout";
											} else
												btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
										}
									};
									http.send(formdata);
								} else {
									btnlinkthanhcong(curren, "Lỗi xác thực! Vui lòng tải lại trang");
								}
							}
						}
					}
				} else {
					call_toastr(`Sản phẩm này chỉ còn lại ${soluongsanpham} sản phẩm`, 'error');
				}
			} else {// Thông báo chọn
				
				$('.listgiatri').each(function () {
					label = $(this).attr("data-label");
					itemcheck = $(this).find(":checked");
					
					if (!itemcheck.prop("checked")) {
						chuachon = false;
						call_toastr(`Vui lòng chọn ${label}`, 'error');
					}
				});
			}
		} else {
			var loithuoctinh = false;
			chuachon = true;
			$('.listgiatri').each(function () {
				label = $(this).attr("data-label");
				itemcheck = $(this).find(":checked");
				
				if (!itemcheck.prop("checked")) {
					chuachon = false;
					call_toastr(`Vui lòng chọn ${label}`, 'error');
				}
			});
			
			if (chuachon) {
				giatri = new Array();
				$(".giatrithuoctinhchon:checked").each(function () {
					
					if (in_array($(this).val(), listthuoctinhchon)) {
						giatri.push($(this).val());
					} else {
						call_toastr("Có lỗi xảy ra! Vui lòng tải lại trang", 'error');
						loithuoctinh = true;
					}
//         var jsonArg1 = new Object();
//        jsonArg1.giatri = $(this).val();
//        //jsonArg1.ten=$(this).attr("data-name");
				});
				giatri = giatri.toString();
				
				if (!loithuoctinh) {
					// Giá trị mặc định nếu không có thuộc tính chọn
					soluongthem = $(":input[name=soluongthem]").val();
					
					if (parseInt(soluongthem) <= parseInt(soluongsanpham)) {
						
						btnlinkload(curren);
						var formdata = new FormData();
						formdata.append("id_sanpham", id_sanpham);
						formdata.append("id_sanphamchitiet", -1);
						formdata.append("soluongthem", soluongthem);
						formdata.append("giatri", giatri);
						formdata.append("giatien", giasanpham);
						formdata.append("giamgia", giamgia);
						formdata.append("token", token);
						var http = new XMLHttpRequest();
						http.open("POST", URL_ROOT + "checksum/createchecksum", true);
						http.send(formdata);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								var ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									token = ketqua.token;
									var checksum = ketqua.checksum;
									formdata.append("checksum", checksum);
									http = new XMLHttpRequest();
									http.open("POST", URL_ROOT + "sanpham/themgiohang", true);
									http.onreadystatechange = function (event) {
										if (http.readyState == 4 && http.status == 200) {
											ketqua = JSON.parse(http.responseText);
											if (ketqua.tinhtrang == 1) {
												window.location.href = URL_ROOT + "sanpham/checkout";
											} else
												btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
										}
									};
									http.send(formdata);
								} else btnlinkthanhcong(curren, "Bạn không thể thêm sản phẩm này vào giỏ hàng");
							}
						}
					} else
						call_toastr(`Sản phẩm này chỉ còn lại ${soluongsanpham} sản phẩm`, 'error');
				}
			}
		}
		return false;
	});
	
	$(document).on("click", ".xoasanpham", function () {
		item = $(this);
		key = $(this).attr("data-id");
		btnlinkload(item);
		
		var formdata = new FormData();
		formdata.append("key", key);
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
					http.open("POST", URL_ROOT + "sanpham/xoagiohang", true);
					http.onreadystatechange = function (event) {
						if (http.readyState == 4 && http.status == 200) {
							o = JSON.parse(http.responseText);
							if (o.tinhtrang == 1) {
								if (capnhatgiohang(o)) {
									item.parent().parent().remove();
								}
							} else {
								window.location.reload();
							}
						}
					};
					http.send(formdata);
				}
			}
		};
		http.send(formdata);
	});
	
	function capnhatgiohang(ketqua) {
		$('.notify-left').removeClass('totalactive');
		html = '<div class="cart-block-content"> <div class="cart-block-list">  <ul>';
		
		total = 0;
		tongtien = 0;
		for (var key in ketqua.data) {
			var obj = ketqua.data[key];
			
			total++;
			html += '<li class="product-info">';
			html += '<div class="p-left">  <a data-id="' + key + '" class="remove_link xoasanpham"></a>  <a >';
			html += '<img class="img-responsive" src="' + URL_ROOT + 'public/upload/images/thumb_hinhsanpham/' + obj.hinhsanpham + '" alt="p10"> </a> </div>';
			html += '<div class="p-right">';
			html += '<p class="p-name">' + obj.tensanpham + '</p>';
			if (obj.tengiatri != '')
				html += '<p>Thuộc tính: ' + obj.tengiatri;
			html += '</p>';
			if (checkTimeSale(obj.thoigiankhuyenmai))
				html += '<p>Giảm giá: ' + tinh_lamTron_phantram(obj.giasanpham, obj.giamgia) + '%</p>';
			html += '<p>Số lượng: ' + obj.soluongthem + '</p>';
			html += '<p>Đơn giá: ' + format1(parseInt(obj.giasanpham), "") + '&#8363;</p>';
			if (checkTimeSale(obj.thoigiankhuyenmai) && obj.giamgia > 0)
				tien = obj.giamgia * obj.soluongthem;
			else
				tien = obj.giasanpham * obj.soluongthem;
			html += '  <p class="p-rice">Tổng: ' + format1(parseInt(tien), '$') + '&#8363;</p>';
			html += '</div> </li>';
			tongtien = tongtien + tien;
		}
		html += '</ul></div>';
		html += ' <div class="toal-cart"> <span>Tổng cộng:</span>';
		html += '  <span class="toal-price pull-right">$' + format1(tongtien, '') + '&#8363;</span> </div>'
		html += '<div class="cart-buttons">  <a href="' + URL_ROOT + 'sanpham/checkout" class="btn-check-out">Lập hóa đơn</a>  </div></div>';
		
		$('.cart-block').html(html);
		$('.notify-left').addClass('totalactive');
		$('.total').html('(' + total + ')' + " sản phẩm");
		$('.header-cart .badge').html(total);
		
		
		$('.badge-cart').html(total);
		return true;
	}
});
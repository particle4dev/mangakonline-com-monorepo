import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TitleSection from '../TitleSection';
import Section from '../Section';

const debug = require('debug')('containers:Review:ProductDetailSection');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

function ProductDetailSection() {
  debug('render');

  const classes = useStyles({});

  return (
    <Section id="product-detail">
      <TitleSection title="Chi tiết sản phẩm" />
      <div className="product-detail page-product__detail">
        <div className="_2C2YFD">
          <div className="_2C2YFD">
            <div className="_2aZyWI">
              <div className="_2u0jt9" style={{
                whiteSpace: 'pre-wrap',
                // color: 'rgba(0,0,0,.8)',
                fontSize: '.875rem',
                overflow: 'hidden',
                textOverflow:' ellipsis',
                lineHeight: '1.875rem'
              }}>
                <span style={{
                  whiteSpace: 'pre-wrap',
                  // color: 'rgba(0,0,0,.8)',
                  fontSize: '.875rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.875rem'
                }}>
                  {`✅ Thương hiệu: DELIYA - Hàng nội địa Trung Quốc.
✅ Công suất định mức: 2200W.
✅ Điện áp: 220v.
✅ Máy có 2 chế độ nóng lạnh
✅ Máy đi kèm với 1 vòi sấy tóc đầu dẹp vừa sấy nhanh, vừa tạo mẫu tóc
✅ Do không dùng lò xo điện tạo nhiệt nên không làm tóc bị khô, cháy.
✅ Máy có 2 nút chỉnh chế độ sấy lớn nhỏ, máy được gia công bằng loại nhựa PVC tổng hợp rất cứng chịu được nhiệt độ cao nên sử dụng lâu dài không vấn đề gì.
✅ Có thể dùng để sấy lông cho chó mèo
✅ Bộ sản phẩm bao gồm 1 đầu duỗi thẳng đi kèm

Cách dùng và bảo quản:
 + Lắp vòi  sấy vào và chỉnh chế độ sấy, nên chỉnh chế độ sấy từ thấp lên cao tránh làm máy quá nóng dẫn đến tuổi thọ kém.
 + Nên giữ tay khô thoáng trước khi dùng máy, nếu sấy lâu thì nên dừng 1 lúc cho máy tản bớt nhiệt, nếu máy hoạt động ở mức nhiệt cao và lâu thì độ chịu nhiệt sẽ kém dần.
 + Tuyệt đối để xa tầm tay của trẻ em
 + Hãy giữ cho bàn tay của bạn khô ráo khi sử dụng
 + Không mang vào phòng tắm để sử dụng
 + Không chặn cửa hút gió và cửa ra của máy sấy tóc.
 + Nên để ở nơi khô ráo, tránh ẩm

❗️SHOP LUÔN HỖ TRỢ VIỆC ĐỔI TRẢ HÀNG NẾU SẢN PHẨM CÓ VẤN ĐỀ, XIN KHÁCH LƯU Ý NHỮNG ĐIỀU SAU:
1. Khi nhận hàng nên quay lại video mở gói hàng để có căn cứ giải quyết trong trường hợp sản phẩm bị vỡ hay bị thiếu.
2. Đọc kỹ và làm theo lưu ý ở phần mô tả sản phẩm.
3. Hàng hoàn lại đảm bảo đầy đủ hộp và sản phẩm.
4. Hàng đổi trả trong vòng 7 ngày (Shopee chỉ hỗ trợ đổi trả trong 3 ngày, vì vậy nếu quá 3 ngày mà khách muốn trả hàng khách có thể liên hệ trực tiếp cho shop để được hỗ trợ nha).

🛠 Chính sách và hậu mãi
 + Shop cam kết không bán hàng giả, hàng nhái, chất lượng luôn là hàng đầu để shop có thể phát triển thương hiệu và vươn xa.
 + Sản phẩm cam kết như hình thật 100%
 + Tư vấn nhiệt tình, chu đáo luôn lắng nghe khách hàng để phục vụ tốt.
 + Giao hàng nhanh đúng tiến độ không phải để quý khách chờ đợi lâu để nhận hàng.

❗️Free ship từ đơn hàng 50K
- Các bạn kết hợp mua thêm các món vật dụng nhỏ trong shop để đc Free ship ạ
- Khi bạn đặt hàng nhớ kiểm tra xem còn phiếu giảm giá >>> free ship nào ko, đặt cho tiết kiệm

 #maysaytoc #maysaylongchomeo #maysay
-------------------
Lily Store - Chuyên đồ gia dụng
☎ 0967.514.820 (Phone, Zalo, Facebook)`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ProductDetailSection.displayName = 'containers__ProductDetailSection';
}

ProductDetailSection.defaultProps = {};

export default React.memo(ProductDetailSection);

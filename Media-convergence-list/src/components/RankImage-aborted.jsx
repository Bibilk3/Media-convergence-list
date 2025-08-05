import { useState, useRef } from 'react';
import { Button, Modal, Spin, Card, Select, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import html2canvas from 'html2canvas'; // 需要安装：npm install html2canvas

const { Option } = Select;

const RankImage = ({ currentRankType, rankData }) => {
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageStyle, setImageStyle] = useState('style1');
  const canvasRef = useRef(null);

  // 生成榜单图片
  const generateImage = async () => {
    if (!rankData || !rankData.list || rankData.list.length === 0) {
      message.warning('没有可生成图片的数据');
      return;
    }

    setLoading(true);
    try {
      // 使用html2canvas将DOM转换为图片
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 2, // 提高清晰度
        logging: false
      });
      
      const imgUrl = canvas.toDataURL('image/png');
      setImageUrl(imgUrl);
      setPreviewVisible(true);
      message.success('图片生成成功');
    } catch (error) {
      console.error('图片生成失败:', error);
      message.error('图片生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 下载图片
  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${getRankTypeName()}_${new Date().toLocaleDateString()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 获取榜单类型名称
  const getRankTypeName = () => {
    switch(currentRankType) {
      case 'index': return '指数榜';
      case 'popular': return '爆款榜';
      case 'matrix': return '矩阵榜';
      default: return '榜单';
    }
  };

  // 获取榜单标题
  const getRankTitle = () => {
    switch(currentRankType) {
      case 'index': return '融媒体指数榜';
      case 'popular': return '爆款稿件榜';
      case 'matrix': return '媒体矩阵榜';
      default: return '榜单';
    }
  };

  return (
    <Card title="榜单图片生成" style={{ margin: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Select 
          value={imageStyle} 
          onChange={setImageStyle}
          style={{ width: 200, marginRight: 16 }}
        >
          <Option value="style1">样式一（经典）</Option>
          <Option value="style2">样式二（简约）</Option>
          <Option value="style3">样式三（突出排名）</Option>
        </Select>
        
        <Button 
          type="primary" 
          icon={<Icon type="image"/>} 
          onClick={generateImage}
          loading={loading}
        >
          生成榜单图片
        </Button>
      </div>
      
      {/* 图片预览区域 - 用于生成图片的DOM结构 */}
      <div 
        ref={canvasRef} 
        style={{ 
          display: 'none', // 隐藏原始DOM，只在生成图片时使用
          padding: '20px',
          width: '600px',
          margin: '0 auto',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* 样式一：经典样式 */}
        {imageStyle === 'style1' && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>{getRankTitle()}</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
              {rankData.period || '2024年第32周'} | {rankData.category || '全类别'}
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>排名</th>
                  {currentRankType !== 'matrix' && (
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>账号名称</th>
                  )}
                  {currentRankType === 'matrix' && (
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>主体名称</th>
                  )}
                  {currentRankType !== 'popular' && (
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>指数</th>
                  )}
                  {currentRankType === 'popular' && (
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>稿件标题</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rankData.list.map((item, index) => (
                  <tr key={item.key || index}>
                    <td style={{ 
                      border: '1px solid #ddd', 
                      padding: '8px', 
                      textAlign: 'center',
                      fontWeight: index < 3 ? 'bold' : 'normal',
                      color: index === 0 ? '#e63946' : index === 1 ? '#457b9d' : index === 2 ? '#1d3557' : '#333'
                    }}>
                      {item.index}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {currentRankType !== 'matrix' ? item.account : item.subject}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {currentRankType !== 'popular' ? item.contribution || item.score : item.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ textAlign: 'right', marginTop: '15px', fontSize: '12px', color: '#999' }}>
              数据更新时间：{new Date().toLocaleString()}
            </p>
          </div>
        )}
        
        {/* 其他样式可以在这里继续添加 */}
        {imageStyle === 'style2' && (
          <div style={{ fontSize: '14px' }}>
            <h3 style={{ textAlign: 'center', margin: '10px 0' }}>{getRankTitle()}</h3>
            <div style={{ marginBottom: '15px', textAlign: 'center', fontSize: '12px' }}>
              {rankData.period || '2024年第32周'}
            </div>
            {rankData.list.map((item, index) => (
              <div key={item.key || index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px dashed #eee'
              }}>
                <span style={{ 
                  width: '10%', 
                  textAlign: 'center',
                  fontWeight: index < 3 ? 'bold' : 'normal'
                }}>
                  {item.index}
                </span>
                <span style={{ width: '50%' }}>
                  {currentRankType !== 'matrix' ? item.account : item.subject}
                </span>
                <span style={{ width: '40%', textAlign: 'right' }}>
                  {currentRankType !== 'popular' ? item.contribution || item.score : item.title.substring(0, 15) + '...'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 图片预览弹窗 */}
      <Modal
        title={`${getRankTypeName()}图片预览`}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={downloadImage}>
            下载图片
          </Button>,
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            关闭
          </Button>
        ]}
        width={700}
      >
        {imageUrl && (
          <div style={{ textAlign: 'center' }}>
            <img 
              src={imageUrl} 
              alt={`${getRankTypeName()}图片`} 
              style={{ maxWidth: '100%', maxHeight: '70vh' }} 
            />
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default RankImage;

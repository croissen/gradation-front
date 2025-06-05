import React, { useEffect, useRef, useState } from 'react';
import S from './style';
import { Swiper } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ExhibitionGradation = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [arts, setArts] = useState([]);
  const [info, setInfos] = useState();
  const [lastExhibition, setLastExhibition] = useState([]);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    gradationExhibitionTitle: '',
    gradationExhibitionArt: '',
    gradationExhibitionCategory: '',
    gradationExhibitionTime: '',
    gradationExhibitionFee: '',
    gradationExhibitionTel: '',
    gradationExhibitionAddress: '',
    gradationExhibitionRealAddress: '',
    gradationExhibitionDate: ''
  });

  
  const [photoForms, setPhotoForms] = useState([]);
  const handleAddPhotoForm = () => {
    if (photoForms.length >= 3) {
        return;
    }
    const newId = Date.now(); 
    setPhotoForms([...photoForms, { id: newId, preview: null, file: null, existing: false }]);
  };
console.log(form.preview);
  useEffect(() => {
    if (info?.images) {
      const initialForms = info.images.map(img => ({
        id: img.id,
        preview: `http://localhost:10000/files/api/get/${img.gradationExhibitionImgName}?filePath=${img.gradationExhibitionImgPath}`,
        file: null,
        existing: true,
      }));
      setPhotoForms(initialForms);
    }
  }, [info]);

  const handleRemovePhotoForm = (id) => {
    setPhotoForms((prevForms) => prevForms.filter((form) => form.id !== id));
  };

const handleFileChange = (e, id) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setPhotoForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id
          ? {
              ...form,
              preview: reader.result, 
              file,                   
              existing: false         
            }
          : form
      )
    );
  };
  reader.readAsDataURL(file);
};

  useEffect(() => {
    if (edit && info?.gradation) {
      setForm({
        gradationExhibitionTitle: info.gradation.gradationExhibitionTitle || '',
        gradationExhibitionArt: info.gradation.gradationExhibitionArt || '',
        gradationExhibitionCategory: info.gradation.gradationExhibitionCategory || '',
        gradationExhibitionTime: info.gradation.gradationExhibitionTime || '',
        gradationExhibitionFee: info.gradation.gradationExhibitionFee || '',
        gradationExhibitionTel: info.gradation.gradationExhibitionTel || '',
        gradationExhibitionAddress: info.gradation.gradationExhibitionAddress || '',
        gradationExhibitionRealAddress: info.gradation.gradationExhibitionRealAddress || '',
        gradationExhibitionDate: info.gradation.gradationExhibitionDate || ''
      });
    }
  }, [edit]);

  useEffect(() => {
    const fetchGradationImgs = async () => {
      const response = await fetch(`http://localhost:10000/exhibitions/api/gradation/top-liked-art`);
      const arts = await response.json();
      setArts(arts);
    };
    fetchGradationImgs();
  }, []);

  useEffect(() => {
    const fetchGradationInfo = async () => {
      const response = await fetch(`http://localhost:10000/exhibitions/api/gradation/current`);
      const data = await response.json();
      setInfos(data);
    };
    fetchGradationInfo();
  }, []);

  useEffect(() => {
    const fetchLastExhibition = async () => {
      const response = await fetch(`http://localhost:10000/exhibitions/api/gradation/recent`);
      const data = await response.json();
      setLastExhibition(data.exhibitions);
    };
    fetchLastExhibition();
  }, []);

  useEffect(() => {
    const realAddress = info?.gradation?.gradationExhibitionRealAddress;
    if (!realAddress) return;

    const loadMap = () => {
      const container = document.getElementById("map");
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
        draggable: true,
        scrollwheel: false
      });

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(realAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          new window.kakao.maps.Marker({ map, position: coords });
          map.setCenter(coords);
        }
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=009a52c6bf731449d477ab86172f9d4e&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          loadMap();
        });
      };
      document.head.appendChild(script);
    }
  }, [info?.gradation?.gradationExhibitionRealAddress]);


    const handleUpdate = async () => {
  try {
    const existingIds = photoForms.filter(f => f.existing).map(f => f.id);
    const toDelete = info.images
      .map(img => img.id)
      .filter(id => !existingIds.includes(id));

    await Promise.all(
      toDelete.map(id =>
        fetch(`http://localhost:10000/exhibitions/api/gradation/image/${id}`, {
          method: 'DELETE',
        })
      )
    );

    const newFiles = photoForms.filter(f => f.file);

    if (newFiles.length > 0) {
      const formData = new FormData();
      newFiles.forEach(f => formData.append('files', f.file));

      const uploadRes = await fetch(`http://localhost:10000/files/api/upload/exhibition/gradation/${info.gradation.id}`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('사진 업로드 실패');
    }

    const res = await fetch(`http://localhost:10000/exhibitions/api/modify/${info?.gradation?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        id: info?.gradation?.id,
      }),
    });

    if (!res.ok) throw new Error("수정 실패");

    const result = await res.json();

    setEdit(false);
    setInfos((prev) => ({ ...prev, gradation: result }));
    window.location.reload();

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};




    return (
      <div>
        <S.TitleWrap>
          <S.Title>"여러분의 작품을 전시해드립니다."</S.Title>
        </S.TitleWrap>

        <S.SwiperWrap>
          <Swiper modules={[Navigation, Autoplay]} slidesPerView={'auto'} spaceBetween={68} loop={arts.length >= 6} speed={3000} autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}>
            {arts.map((art, idx) => (
              <S.SwiperSlide key={idx}>
                <S.ImgWrap>
                  <S.ArtImg src={`http://localhost:10000/files/api/get/${art.artImgName}?filePath=${art.artImgPath}`} alt={art.artTitle} />
                  <NavLink to={`/display/detail/${art.id}`}>
                    <S.ArtInfo>
                      <p>{art.artTitle}</p>
                      <p>{art.userName}</p>
                    </S.ArtInfo>
                  </NavLink>
                </S.ImgWrap>
              </S.SwiperSlide>
            ))}
          </Swiper>
        </S.SwiperWrap>

        <S.InfoContainer>
          <S.InfoWrap>
            <S.Infomation>INFORMATION</S.Infomation>
            <S.Guide>전시안내</S.Guide>
            {currentUser?.userAdminOk && (
              <S.ButtonArea>
                <S.AddButton>새로운 전시</S.AddButton>
                <S.EditButton onClick={() => (edit ? handleUpdate() : setEdit(true))}>{edit ? '수정 완료' : '전시 수정'}</S.EditButton>
              </S.ButtonArea>
            )}
          </S.InfoWrap>

          <S.MapWrap>
            <S.Map id="map" />
            <div>
              <S.InfoDetail>
                <S.InfoName>전시명</S.InfoName>
                <S.bar>|</S.bar>
                {edit ? <S.Input value={form.gradationExhibitionTitle} onChange={(e) => setForm({ ...form, gradationExhibitionTitle: e.target.value })} /> : <S.InfoContent>{info?.gradation?.gradationExhibitionTitle}</S.InfoContent>}
              </S.InfoDetail>
              <S.InfoDetail>
                <S.InfoName>전시 작품</S.InfoName>
                <S.bar>|</S.bar>
                {edit ? <S.Input value={form.gradationExhibitionArt} onChange={(e) => setForm({ ...form, gradationExhibitionArt: e.target.value })} /> : <S.InfoContent>{info?.gradation?.gradationExhibitionArt}</S.InfoContent>}
              </S.InfoDetail>
              <S.InfoDetail>
                <S.InfoName>작품 구성</S.InfoName>
                <S.bar>|</S.bar>
                {edit ? <S.Input value={form.gradationExhibitionCategory} onChange={(e) => setForm({ ...form, gradationExhibitionCategory: e.target.value })} /> : <S.InfoContent>{info?.gradation?.gradationExhibitionCategory}</S.InfoContent>}
              </S.InfoDetail>
              <S.InfoDetail>
                <S.InfoName>관람 시간</S.InfoName>
                <S.bar>|</S.bar>
                {edit ? <S.Input value={form.gradationExhibitionTime} onChange={(e) => setForm({ ...form, gradationExhibitionTime: e.target.value })} /> : <S.InfoContent>{info?.gradation?.gradationExhibitionTime}</S.InfoContent>}
              </S.InfoDetail>
              <S.InfoDetail>
                <S.InfoName>관람료</S.InfoName>
                <S.bar>|</S.bar>
                {edit ? <S.Input value={form.gradationExhibitionFee} onChange={(e) => setForm({ ...form, gradationExhibitionFee: e.target.value })} /> : <S.InfoContent>{info?.gradation?.gradationExhibitionFee}</S.InfoContent>}
              </S.InfoDetail>
              <S.InfoDetail>
                <S.InfoName>전시 문의</S.InfoName>
                <S.bar>|</S.bar>
                {edit ? <S.Input value={form.gradationExhibitionTel} onChange={(e) => setForm({ ...form, gradationExhibitionTel: e.target.value })} /> : <S.InfoContent>{info?.gradation?.gradationExhibitionTel}</S.InfoContent>}
              </S.InfoDetail>
              {edit && (
                <S.InfoDetail>
                  <S.InfoName>전시관 주소</S.InfoName>
                  <S.bar>|</S.bar>
                  <S.Input value={form.gradationExhibitionRealAddress} onChange={(e) => setForm({ ...form, gradationExhibitionRealAddress: e.target.value })} />
                </S.InfoDetail>
              )}
            </div>
          </S.MapWrap>

          <S.gradationContainer>
            <S.gradationInfo>
              {edit ? <S.Input value={form.gradationExhibitionAddress} onChange={(e) => setForm({ ...form, gradationExhibitionAddress: e.target.value })} /> : <S.Address>{info?.gradation?.gradationExhibitionAddress}</S.Address>}
              <S.Line src="/assets/images/icon/Line.png" alt="line" />
              {edit ? <S.Input value={form.gradationExhibitionDate} onChange={(e) => setForm({ ...form, gradationExhibitionDate: e.target.value })} /> : <S.Date>{info?.gradation?.gradationExhibitionDate}</S.Date>}
            </S.gradationInfo>

            <S.LastExhibition>
              {lastExhibition.map((exhibition, idx) => (
                <S.NavLink key={idx} to={`/exhibition/gradation/past/${exhibition.id}`}>
                  <p>{exhibition.title}</p>
                </S.NavLink>
              ))}
            </S.LastExhibition>
          </S.gradationContainer>
        </S.InfoContainer>

        
          <S.GradationImgWrap>
            <S.GradationInfo>공간 정보</S.GradationInfo>
            <S.AddFormDiv>
              {edit && (
                <S.AddForm onClick={handleAddPhotoForm}>사진폼 추가</S.AddForm>
              )}
            </S.AddFormDiv>

            {photoForms.length > 0 && (
              <div key={photoForms[0].id}>
                <S.AddPhoto onClick={() => edit && document.getElementById(`file-input-${photoForms[0].id}`).click()}>
                  {photoForms[0].preview ? (
                    <S.ImgFile src={photoForms[0].preview} alt="preview" />
                  ) : (
                    edit && (
                      <>
                        <S.AddImg src="/assets/images/icon/add.png" alt="add" />
                        첨부파일 업로드
                      </>
                    )
                  )}
                </S.AddPhoto>

                {edit && (
                  <input
                    type="file"
                    id={`file-input-${photoForms[0].id}`}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, photoForms[0].id)}
                  />
                )}
              </div>
            )}
          </S.GradationImgWrap>

          <S.UploadDiv>
            {photoForms.slice(1).map((form) => (
              <div key={form.id}>
                <S.AddFormDiv>
                  {edit && (
                    <S.AddForm onClick={() => handleRemovePhotoForm(form.id)}>사진폼 삭제</S.AddForm>
                  )}
                </S.AddFormDiv>

                <S.AddPhoto onClick={() => edit && document.getElementById(`file-input-${form.id}`).click()}>
                  {form.preview ? (
                    <S.ImgFile src={form.preview} alt="preview" />
                  ) : (
                    edit && (
                      <>
                        <S.AddImg src="/assets/images/icon/add.png" alt="add" />
                        첨부파일 업로드
                      </>
                    )
                  )}
                </S.AddPhoto>

                {edit && (
                  <input
                    type="file"
                    id={`file-input-${form.id}`}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, form.id)}
                  />
                )}
              </div>
            ))}
          </S.UploadDiv>
      </div>
    );
  };

  export default ExhibitionGradation;

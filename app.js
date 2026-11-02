/**
 * 풍무푸르지오 리버프론트 - 원페이지 롱스크롤(One-page Vertical Scroll) 인터랙티브 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  initScrollSpyAndHeader();
  initUnitViewer();
  initModals();
  initLeadForms();
});

/**
 * 1. 상단 고정 GNB 스크롤 효과 & 5대 섹션 ScrollSpy 활성화
 *    (#business, #location, #complex, #units, #premium)
 */
function initScrollSpyAndHeader() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-anchor');
  const sections = ['business', 'location', 'complex', 'units', 'premium']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const onScroll = () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // 현재 스크롤 위치에 해당하는 섹션 탐색
    let currentSectionId = 'business';
    const triggerOffset = window.innerHeight * 0.28;

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= triggerOffset) {
        currentSectionId = sec.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 2. 평형안내 (#units) - 12개 타입 인터랙티브 뷰어
 *    [84A · 84B · 84C · 84D · 84E · 84F · 106A · 106B · 122 · 180A · 180B1 · 180C]
 */
function initUnitViewer() {
  const unitBtns = document.querySelectorAll('.unit-type-btn');
  const badgeLabelEl = document.getElementById('unit-badge-label');
  const titleEl = document.getElementById('unit-title');
  const subtitleEl = document.getElementById('unit-subtitle');
  const exclusiveEl = document.getElementById('unit-exclusive-area');
  const commonEl = document.getElementById('unit-common-area');
  const supplyEl = document.getElementById('unit-supply-area');
  const roomsEl = document.getElementById('unit-rooms');
  const featureEl = document.getElementById('unit-feature');
  const ctaTextEl = document.getElementById('unit-cta-text');
  const floorplanImg = document.getElementById('unit-floorplan-img');
  const floorplanSvgContainer = document.getElementById('unit-floorplan-svg');
  const modalUnitSelect = document.getElementById('modal-unit');

  const unitSpecs = {
    '84A': {
      image: './images/유니트 84a-1.png',
      group: '84',
      badge: '4BAY 판상형 주력 타입',
      title: '84㎡ A TYPE',
      subtitle: '채광과 맞통풍이 뛰어난 4Bay 4Room 혁신 평면',
      exclusive: '84.96㎡ (25.70평)',
      common: '27.42㎡',
      supply: '112.38㎡ (33.99평)',
      rooms: '침실3 · 알파룸 · 욕실2 · 드레스룸 · 팬트리',
      feature: '4Bay 판상형 맞통풍 구조, 현관 워크인 창고 및 주방 대형 팬트리, 안방 광폭 드레스룸 특화 설계가 적용됩니다.',
      layoutType: '4BAY 판상형 · 4Room 맞통풍'
    },
    '84B': {
      image: './images/유니트 84-B.png',
      group: '84',
      badge: '4BAY 판상형 와이드 다이닝',
      title: '84㎡ B TYPE',
      subtitle: '대면형 아일랜드 주방과 수납을 강화한 4Bay 평면',
      exclusive: '84.94㎡ (25.69평)',
      common: '27.51㎡',
      supply: '112.45㎡ (34.01평)',
      rooms: '침실3 · 알파룸 · 욕실2 · 워크인 드레스룸',
      feature: '거실과 주방의 일체감을 높인 와이드 다이닝 설계와 복도 팬트리로 공간 활용도를 극대화했습니다.',
      layoutType: '4BAY 판상형 · 와이드 다이닝'
    },
    '84C': {
      image: './images/유니트 84c-1.png',
      group: '84',
      badge: '2면 개방 타워형 조망 특화',
      title: '84㎡ C TYPE',
      subtitle: '수변 및 단지 조망을 극대화한 2면 개방형 거실',
      exclusive: '84.89㎡ (25.68평)',
      common: '27.60㎡',
      supply: '112.49㎡ (34.02평)',
      rooms: '침실3 · 욕실2 · 대형 드레스룸 · 현관 팬트리',
      feature: '2면 개방형 거실 창호를 통해 파노라마 조망권을 확보하고 마스터존과 자녀방 프라이버시를 분리했습니다.',
      layoutType: '타워형 2면 개방 · 파노라마 뷰'
    },
    '84D': {
      image: './images/유니트 84d-1.png',
      group: '84',
      badge: '4BAY 판상형 수납 특화',
      title: '84㎡ D TYPE',
      subtitle: '더블 팬트리와 순환형 주방 동선을 갖춘 실속 명품 평면',
      exclusive: '84.92㎡ (25.69평)',
      common: '27.46㎡',
      supply: '112.38㎡ (33.99평)',
      rooms: '침실3 · 알파룸 · 욕실2 · 더블 팬트리',
      feature: '주방과 다용도실 순환 동선 및 현관·복도 더블 팬트리 구성으로 사계절 수납 여유를 제공합니다.',
      layoutType: '4BAY 판상형 · 더블 팬트리'
    },
    '84E': {
      image: './images/유니트 84e-1.png',
      group: '84',
      badge: '3면 발코니 확장 특화',
      title: '84㎡ E TYPE',
      subtitle: '넓은 서비스 면적과 채광을 누리는 특화 평면',
      exclusive: '84.95㎡ (25.70평)',
      common: '27.55㎡',
      supply: '112.50㎡ (34.03평)',
      rooms: '침실3 · 알파룸 · 욕실2 · 광폭 드레스룸',
      feature: '3면 발코니 확장으로 실사용 면적을 극대화하였으며 안방 쇼룸형 드레스룸이 제공됩니다.',
      layoutType: '3면 개방 특화 · 광폭 실사용'
    },
    '84F': {
      image: './images/유니트 84f-1.png',
      group: '84',
      badge: '프라이빗 코너 타워형',
      title: '84㎡ F TYPE',
      subtitle: '독립적인 공간 배치와 다이닝 조망창 특화 설계',
      exclusive: '84.85㎡ (25.66평)',
      common: '27.68㎡',
      supply: '112.53㎡ (34.04평)',
      rooms: '침실3 · 가족실 · 욕실2 · 드레스룸',
      feature: '식당 전용 조망창과 프라이빗 마스터 스위트존 설계로 호텔 같은 주거 감성을 선사합니다.',
      layoutType: '코너 타워형 · 다이닝 조망창'
    },
    '106A': {
      image: './images/유니트106-1.png',
      group: '106',
      badge: '4.5BAY 중대형 하이엔드',
      title: '106㎡ A TYPE',
      subtitle: '여유로운 광폭 거실과 4Room+알파룸의 중대형 주력 평면',
      exclusive: '106.42㎡ (32.19평)',
      common: '33.18㎡',
      supply: '139.60㎡ (42.23평)',
      rooms: '침실4 · 알파룸 · 욕실2 · 쇼룸형 드레스룸 · 대형 팬트리',
      feature: '4.5Bay 판상형 구조로 거실 폭을 넓히고, 호텔식 건·습식 분리형 부부욕실과 6인용 다이닝 공간을 구현했습니다.',
      layoutType: '4.5BAY 판상형 · 하이엔드 중대형'
    },
    '106B': {
      image: './images/유니트b106-1.png',
      group: '106',
      badge: '3면 개방 파노라마 중대형',
      title: '106㎡ B TYPE',
      subtitle: '수변 조망 특화 와이드 거실 & 마스터 스위트룸',
      exclusive: '106.35㎡ (32.17평)',
      common: '33.30㎡',
      supply: '139.65㎡ (42.24평)',
      rooms: '침실4 · 욕실2 · 워크인 클로짓 · 다이닝 바',
      feature: '거실-다이닝 파노라마 창호 배치로 채광과 조망을 극대화하며 독립된 마스터 서재 공간 연출이 가능합니다.',
      layoutType: '파노라마 뷰 · 마스터 스위트'
    },
    '122': {
      image: './images/유니트122-1.png',
      group: '122',
      badge: '5BAY 그랜드 시그니처 대형',
      title: '122㎡ TYPE',
      subtitle: '압도적 공간감의 5Bay 판상형 그랜드 럭셔리 평면',
      exclusive: '122.74㎡ (37.13평)',
      common: '37.86㎡',
      supply: '160.60㎡ (48.58평)',
      rooms: '침실4 · 패밀리룸 · 욕실3 · 더블 드레스룸 · 클린주방',
      feature: '5Bay 와이드 전면 배치, 메인 주방과 보조 클린 주방 분리, 세대 내 3개 욕실과 독립 패밀리 라운지를 갖췄습니다.',
      layoutType: '5BAY 시그니처 · 3욕실 & 패밀리룸'
    },
    '180A': {
      image: './images/유니트180a-1.png',
      group: '180',
      badge: 'SKY PENTHOUSE EDITION',
      title: '180㎡ A TYPE',
      subtitle: '최상층 수변 파노라마 뷰와 프라이빗 테라스를 품은 펜트하우스',
      exclusive: '180.12㎡ (54.48평)',
      common: '52.40㎡',
      supply: '232.52㎡ (70.33평)',
      rooms: '침실5 · 패밀리살롱 · 욕실3 · 야외 테라스 · 대형 다이닝',
      feature: '리버프론트 스카이라인을 독점하는 펜트하우스 A타입으로, 광폭 오픈 테라스와 갤러리형 홀이 제공됩니다.',
      layoutType: '펜트하우스 A · 프라이빗 오픈 테라스'
    },
    '180B1': {
      image: './images/유니트180b-1.png',
      group: '180',
      badge: 'ROYAL SUITE PENTHOUSE',
      title: '180㎡ B1 TYPE',
      subtitle: '2세대 독립 존 구성이 가능한 그랜드 펜트하우스 B1',
      exclusive: '180.38㎡ (54.56평)',
      common: '52.62㎡',
      supply: '233.00㎡ (70.48평)',
      rooms: '침실5 · 응접실 · 욕실3 · 듀얼 마스터존 · 와인바 팬트리',
      feature: '듀얼 마스터 스위트 설계로 세대 간 완벽한 프라이버시를 보장하며 하이엔드 수입 마감재가 기본 적용됩니다.',
      layoutType: '펜트하우스 B1 · 듀얼 마스터 스위트'
    },
    '180C': {
      image: './images/유니트180c-1.png',
      group: '180',
      badge: 'PANORAMIC TERRACE PENTHOUSE',
      title: '180㎡ C TYPE',
      subtitle: '3면 파노라마 조망과 스카이 가든을 갖춘 최상위 펜트하우스',
      exclusive: '180.45㎡ (54.58평)',
      common: '52.75㎡',
      supply: '233.20㎡ (70.54평)',
      rooms: '침실5 · 스카이라운지 · 욕실3 · 루프 테라스 · 쇼룸 드레스룸',
      feature: '3면 개방 파노라마 뷰와 프라이빗 스카이 가든 테라스가 어우러진 풍무푸르지오 리버프론트의 정점입니다.',
      layoutType: '펜트하우스 C · 스카이 가든 테라스'
    }
  };

  function renderUnit(typeKey) {
    const spec = unitSpecs[typeKey];
    if (!spec) return;

    // 버튼 활성 상태 업데이트
    unitBtns.forEach(btn => {
      if (btn.getAttribute('data-unit') === typeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 텍스트 제원 업데이트
    if (badgeLabelEl) badgeLabelEl.textContent = spec.badge;
    if (titleEl) titleEl.textContent = spec.title;
    if (subtitleEl) subtitleEl.textContent = spec.subtitle;
    if (exclusiveEl) exclusiveEl.textContent = spec.exclusive;
    if (commonEl) commonEl.textContent = spec.common;
    if (supplyEl) supplyEl.textContent = spec.supply;
    if (roomsEl) roomsEl.textContent = spec.rooms;
    if (featureEl) featureEl.textContent = spec.feature;
    if (ctaTextEl) ctaTextEl.textContent = `${typeKey} 타입 분양가 및 잔여세대 문의`;

    // 모달 희망 평형 자동 연동 (84 / 106 / 122 / 180)
    if (modalUnitSelect) {
      modalUnitSelect.value = spec.group;
    }

    // 실제 평면도 사진(spec.image) 우선 표시
    if (floorplanImg && floorplanSvgContainer) {
      if (spec.image) {
        floorplanImg.src = spec.image;
        floorplanImg.alt = `${spec.title} 평면도`;
        floorplanImg.classList.remove('hidden');
        floorplanSvgContainer.classList.add('hidden');
      } else {
        floorplanSvgContainer.innerHTML = buildArchitecturalFloorplanSVG(typeKey, spec);
        floorplanImg.classList.add('hidden');
        floorplanSvgContainer.classList.remove('hidden');
      }
    }
  }

  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const typeKey = btn.getAttribute('data-unit');
      renderUnit(typeKey);
    });
  });

  // 초기 기본 렌더링: 84A
  renderUnit('84A');
}

/**
 * 12개 타입별 맞춤형 고해상도 건축 평면도 SVG 생성기
 */
function buildArchitecturalFloorplanSVG(typeKey, spec) {
  const isPent = spec.group === '180';
  const isLarge = spec.group === '106' || spec.group === '122';

  return `
    <svg viewBox="0 0 860 540" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="w-full h-full select-none">
      <defs>
        <linearGradient id="prugioHeaderGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#004225"/>
          <stop offset="100%" stop-color="#0A5C36"/>
        </linearGradient>
        <linearGradient id="champagneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#DFC8A8"/>
          <stop offset="50%" stop-color="#C5A880"/>
          <stop offset="100%" stop-color="#9E8058"/>
        </linearGradient>
      </defs>

      <!-- 도면 배경 및 그리드 -->
      <rect width="860" height="540" fill="#0F172A"/>
      <g stroke="#1E293B" stroke-width="1">
        <path d="M0 60 H860 M0 120 H860 M0 180 H860 M0 240 H860 M0 300 H860 M0 360 H860 M0 420 H860 M0 480 H860"/>
        <path d="M60 0 V540 M120 0 V540 M180 0 V540 M240 0 V540 M300 0 V540 M360 0 V540 M420 0 V540 M480 0 V540 M540 0 V540 M600 0 V540 M660 0 V540 M720 0 V540 M780 0 V540"/>
      </g>

      <!-- 상단 타이틀 바 -->
      <rect x="40" y="22" width="780" height="48" rx="10" fill="url(#prugioHeaderGrad)" stroke="#C5A880" stroke-width="1.5"/>
      <text x="65" y="52" fill="#FFFFFF" font-size="18" font-weight="800" font-family="Montserrat, Noto Sans KR, sans-serif">
        PUNGMU PRUGIO RIVERFRONT • ${spec.title}
      </text>
      <text x="795" y="51" fill="#DFC8A8" font-size="13" font-weight="700" text-anchor="end" font-family="Noto Sans KR, sans-serif">
        전용 ${spec.exclusive} | 공급 ${spec.supply}
      </text>

      <!-- 외벽 프레임 -->
      <rect x="60" y="92" width="740" height="390" rx="6" fill="#1E293B" stroke="url(#champagneGrad)" stroke-width="5"/>

      <!-- 북향/후면 구역: 현관, 욕실, 주방/다이닝, 드레스룸 -->
      <!-- 현관 & 팬트리 -->
      <rect x="76" y="108" width="145" height="125" fill="#263349" stroke="#64748B" stroke-width="2"/>
      <text x="148" y="162" fill="#E2E8F0" font-size="15" font-weight="700" text-anchor="middle">현관 / 공용욕실</text>
      <text x="148" y="185" fill="#94A3B8" font-size="12" text-anchor="middle">워크인 신발장 · 팬트리</text>

      <!-- 알파룸 / 팬트리 -->
      <rect x="228" y="108" width="135" height="125" fill="#263349" stroke="#64748B" stroke-width="2"/>
      <text x="295" y="162" fill="#DFC8A8" font-size="15" font-weight="700" text-anchor="middle">${isPent ? '패밀리 살롱' : (isLarge ? '알파룸 / 서재' : '알파룸 · 팬트리')}</text>
      <text x="295" y="185" fill="#94A3B8" font-size="12" text-anchor="middle">수납 · 공간 특화</text>

      <!-- 주방 & 다이닝 -->
      <rect x="370" y="108" width="225" height="125" fill="#2A3950" stroke="#C5A880" stroke-width="2"/>
      <rect x="415" y="190" width="135" height="26" rx="4" fill="#004225" stroke="#C5A880" stroke-width="1"/>
      <text x="482" y="150" fill="#FFFFFF" font-size="16" font-weight="800" text-anchor="middle">주방 및 다이닝 (Kitchen)</text>
      <text x="482" y="172" fill="#DFC8A8" font-size="12" text-anchor="middle">아일랜드 식탁 & 맞통풍 창호</text>
      <text x="482" y="207" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">GREENERY DINING ZONE</text>

      <!-- 드레스룸 & 부부욕실 -->
      <rect x="602" y="108" width="182" height="125" fill="#263349" stroke="#64748B" stroke-width="2"/>
      <text x="693" y="162" fill="#DFC8A8" font-size="15" font-weight="700" text-anchor="middle">광폭 드레스룸 · 부부욕실</text>
      <text x="693" y="185" fill="#94A3B8" font-size="12" text-anchor="middle">파우더룸 · 호텔식 세면대</text>

      <!-- 전면(남향/수변 조망) 4Bay~5Bay 구역 -->
      <!-- 침실 3 -->
      <rect x="76" y="248" width="135" height="216" fill="#1E2D3D" stroke="#64748B" stroke-width="2"/>
      <text x="143" y="350" fill="#FFFFFF" font-size="16" font-weight="700" text-anchor="middle">침실 3</text>
      <text x="143" y="374" fill="#94A3B8" font-size="12" text-anchor="middle">(Bedroom 3)</text>

      <!-- 침실 2 -->
      <rect x="218" y="248" width="135" height="216" fill="#1E2D3D" stroke="#64748B" stroke-width="2"/>
      <text x="285" y="350" fill="#FFFFFF" font-size="16" font-weight="700" text-anchor="middle">침실 2</text>
      <text x="285" y="374" fill="#94A3B8" font-size="12" text-anchor="middle">(Bedroom 2)</text>

      <!-- 거실 (Living Room) -->
      <rect x="360" y="248" width="235" height="216" fill="#004225" fill-opacity="0.55" stroke="#C5A880" stroke-width="2.5"/>
      <text x="477" y="332" fill="#FFFFFF" font-size="21" font-weight="900" text-anchor="middle">거실 (Living Room)</text>
      <text x="477" y="358" fill="#DFC8A8" font-size="13" font-weight="700" text-anchor="middle">★ ${spec.layoutType}</text>
      <text x="477" y="382" fill="#CBD5E1" font-size="12" text-anchor="middle">우물천장 · 유럽산 아트월 타일</text>

      <!-- 안방 (Master Bedroom) -->
      <rect x="602" y="248" width="182" height="216" fill="#1E2D3D" stroke="#C5A880" stroke-width="2"/>
      <text x="693" y="345" fill="#FFFFFF" font-size="18" font-weight="800" text-anchor="middle">안방 (Master Room)</text>
      <text x="693" y="370" fill="#DFC8A8" font-size="12" text-anchor="middle">${isPent ? '프라이빗 테라스 연결' : '발코니 및 전동 빨래건조대'}</text>

      <!-- 남향 채광 / 조망 표시 바 -->
      <rect x="76" y="454" width="708" height="10" fill="url(#champagneGrad)"/>
      <text x="430" y="512" fill="#DFC8A8" font-size="13" font-weight="700" text-anchor="middle">
        ▲ SOUTH-FACING & RIVERFRONT VIEW WINDOW LINE (남향 위주 채광 및 조망 창호 라인) ▲
      </text>
    </svg>
  `;
}

/**
 * 3. 관심고객 등록 모달 및 개인정보 처리방침 모달 제어
 */
function initModals() {
  const openBtns = document.querySelectorAll('[data-open-modal]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const modals = document.querySelectorAll('.modal-container');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-open-modal');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeAllModals = () => {
    modals.forEach(m => m.classList.add('hidden'));
    document.body.style.overflow = '';
  };

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-container');
      if (parentModal) {
        parentModal.classList.add('hidden');
      }
      const anyOpen = Array.from(modals).some(m => !m.classList.contains('hidden'));
      if (!anyOpen) {
        document.body.style.overflow = '';
      }
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        const anyOpen = Array.from(modals).some(m => !m.classList.contains('hidden'));
        if (!anyOpen) {
          document.body.style.overflow = '';
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

/**
 * 4. 관심고객 등록 폼 핸들러 (전화번호 자동 하이픈 및 DB 수집 완료 토스트)
 */
function initLeadForms() {
  const forms = document.querySelectorAll('.register-form');

  forms.forEach(form => {
    // 전화번호 입력 시 실시간 자동 하이픈(010-0000-0000) 포맷팅
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let digits = e.target.value.replace(/[^0-9]/g, '');
        if (digits.length > 3 && digits.length <= 7) {
          digits = `${digits.slice(0, 3)}-${digits.slice(3)}`;
        } else if (digits.length > 7) {
          digits = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
        }
        e.target.value = digits;
      });
    }
  });
}

import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import { fileURLToPath } from 'url';

// BrowserWindow 객체는 전역으로 관리
// 전역이 아닌 경우 자바스크립트 가비지 컬렉팅 발생 시 의도치 않게 browser window가 닫힐 수 있음
let mainWindow;

const createWindow = () => {
  // browser window를 생성합니다.
  mainWindow = new BrowserWindow({
    height: 1200, // 최소화 크기
    width: 800, // 최소화 크기
    fullscreen: true,
    // resizable: false, // 크기 조정 방지
    // frame: false, // 상단 메뉴바와 창 테두리 제거
    // kiosk: true, // 전체화면 고정 및 종료 방지
    // alwaysOnTop: true, // 항상 다른 화면 위에 표시,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: isDev,
    },
  });

  // 앱의 index.html을 로드합니다.
  if (isDev) {
    // 개발 모드인 경우
    const baseUrl = 'http://localhost:3000';
    mainWindow.loadURL(baseUrl); // 개발 도구에서 호스팅하는 주소로 로드.
    mainWindow.webContents.openDevTools({ mode: 'detach' }); // DevTools 오픈
  } else {
    // 프로덕션 모드인 경우
    const __filename = fileURLToPath(import.meta.url); // 현재 파일의 경로
    const __dirname = path.dirname(__filename); // 현재 퍄일이 있는 폴더의 경로
    mainWindow.loadFile(path.join(__dirname, '../build/index.html')); // 빌드 폴더의 index.html 파일에 접근
  }
};

// Electron이 준비되면 whenReady 메서드가 호출되어,
// 초기화 및 browser window를 생성
app.whenReady().then(() => {
  createWindow();

  // Linux와 Winodws 앱은 browser window가 열려 있지 않을 때 종료됨
  // macOS는 browser window가 열려 있지 않아도 계속 실행되기 때문에,
  // browser window가 열려 있지 않을 때 앱을 활성화 하면 새로운 browser window를 열어줌
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Linux와 Winodws에서는 모든 창을 종료하면 일반적으로 앱이 완전히 종료됨
// macOS(darwin)가 아닌 경우, 'window-all-closed' 이벤트가 발생했을 때, 앱을 종료함
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

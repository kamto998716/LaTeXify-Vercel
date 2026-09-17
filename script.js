// ============================================================
// LaTeXify — Google AI Studio (Gemini) only. All legacy provider
// code, endpoints and keys have been removed.
//
// ⚠️ API KEY IS USED HERE (GEMINI_API_KEY below).
// For public deployment, move the key behind a secure backend proxy.
// ============================================================
const VERCEL_API_ENDPOINT = "/api/gemini"; 

// Ordered fallback list. The user's selection is tried first; if it fails,
// every remaining model is tried automatically in this order.
const GEMINI_MODELS = [
  "gemini-3.5-pro",         // default
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite"
];
const GEMINI_DEFAULT_MODEL = "gemini-3.5-pro";
const MODEL_STORAGE_KEY = "latexify-gemini-model";
const ALL_MODELS_UNAVAILABLE_MESSAGE = "All AI models are currently unavailable. Please try again later.";

// Gemini inline requests are limited to ~2 GB total per request.
const GEMINI_MAX_INLINE_BYTES = 1.9 * 1024 * 1024 * 1024;

const LANG_KEY = "latexify-ui-language-v2";

const i18n = {
  en: {
    runCurrent: "Run Current",
    runAll: "Run all attached",
    documentsEyebrow: "Upload queue",
    documentsTitle: "Documents",
    addFiles: "Add files",
    dropzoneTitle: "Drop PDFs, Word, Images, text, or Markdown files here",
    dropzoneText: "Batch upload is supported. Each file becomes its own LaTeX session and Word export.",
    pickFiles: "Choose files",
    typeText: "Type text",
    clearAll: "Clear all",
    textModalTitle: "Type or paste text",
    textModalPlaceholder: "Type or paste the math question or text to convert...",
    textCancel: "Cancel",
    textSubmit: "Add to queue",
    vpnModalTitle: "VPN connection reminder",
    vpnModalMessage: "If you are located in Hong Kong, please connect to the VPN before using LaTeXify. This tool sends requests to the Google Gemini API.",
    vpnModalConfirm: "I understand",
    modelLabel: "AI model",
    modelText: "Choose the Gemini model used for conversion. If the call fails, every other model is tried automatically in order.",
    previewEyebrow: "Preview panel",
    previewTitle: "Document preview",
    emptyPreviewTitle: "No document selected",
    emptyPreviewText: "Upload one or more files, then choose a document to preview and convert.",
    tabConfiguration: "Configuration",
    tabLogging: "Logging",
    tabResults: "Results",
    copy: "Copy",
    exportWord: "Export to Word",
    configEyebrow: "Conversion options",
    configTitle: "Configuration",
    optionQuotedTitle: "Wrap each question in quotes",
    optionQuotedText: "Keeps each question or subsection separated for easier copying and Word export.",
    optionMathTitle: "Preserve math formatting",
    optionMathText: "Keep equations, alignment, and mathematical symbols in raw LaTeX form.",
    optionImageTitle: "Keep figure or stamp descriptions",
    optionImageText: "Useful for diagrams, seals, logos, or image placeholders inside exam papers.",
    optionStrictTitle: "Output LaTeX only",
    optionStrictText: "Prevents extra commentary from being returned outside the converted result.",
    customPromptLabel: "Additional instruction",
    customPromptPlaceholder: "Example: Keep original numbering, preserve mark allocations, and use aligned environments whenever possible.",
    configNote: "This design keeps the same front-end processing approach as your original file. For public deployment, move the API key behind a secure backend proxy.",
    loggingEyebrow: "Processing trail",
    loggingTitle: "Logging",
    resultsEyebrow: "Extracted output",
    progressReady: "Ready to run",
    emptyResultTitle: "No LaTeX yet",
    emptyResultText: "Select a document, press Run, and the result will appear here as highlightable, copyable text.",
    idle: "Idle",
    noSelection: "No selection",
    documentType: "Type",
    documentSize: "Size",
    documentPages: "Pages",
    documentBlocks: "Blocks",
    mimeImage: "Image",
    mimeFile: "File",
    badgePending: "Queued",
    badgeProcessing: "Processing",
    badgeSuccess: "Done",
    badgeError: "Error",
    badgeReady: "Ready",
    queueEmpty: "No documents yet. Add files to start a workspace queue.",
    queueRemove: "Remove",
    queueSelect: "Select",
    statusReady: "Ready.",
    statusUploaded: count => `${count} document(s) added to the queue.`,
    statusSelected: name => `Selected document: ${name}`,
    statusRunning: name => `Processing ${name}...`,
    statusSuccess: name => `Finished converting ${name}.`,
    statusError: msg => `Error: ${msg}`,
    statusCopied: "Result copied to clipboard.",
    statusCopiedFailed: "Clipboard copy was blocked by the browser.",
    statusExported: name => `Exported ${name} to Word.`,
    statusNoDocument: "Please upload and select a document first.",
    statusNoResult: "No LaTeX result is available for this document yet.",
    statusCleared: "All documents were cleared.",
    statusBusy: "A document is already processing. Please wait for it to finish.",
    statusRemoved: name => `Removed ${name} from the queue.`,
    statusRunAllStarted: count => `Started running ${count} attached document(s).`,
    statusRunAllFinished: count => `Finished running ${count} document(s).`,
    statusRunAllSkipped: "All attached documents are already completed.",
    statusCannotRemoveProcessing: "The active processing document cannot be removed right now.",
    selectedChipReady: "Current",
    resultTitleFallback: "Result preview",
    resultMetaFallback: "0 KB",
    progressProcessing: percent => `Processing… ${percent}%`,
    progressCompleted: "Completed",
    progressFailed: "Processing failed",
    progressQueued: "Waiting to run",
    logEmpty: "No logs yet for the selected document.",
    logQueued: name => `Queued ${name}`,
    logStarted: name => `Started conversion for ${name}`,
    logReadingText: "Reading text content from file",
    logModelFallback: name => `Model ${name} failed. Trying the next model...`,
    previewTextCaption: "Text preview",
    statusTypedQueued: "Typed text added to the queue.",
    statusTypedEmpty: "Please type or paste some text first.",
    logPdfDirect: "Sending PDF to Gemini via native document input (no OCR)",
    logImageDirect: "Sending image to Gemini via native vision input",
    logFileTooLarge: size => `File is too large for inline upload (${size}). Limit is ~2 GB.`,
    logGenerating: "Generating structured LaTeX output",
    logCompleted: blocks => `LaTeX extraction completed${blocks ? ` · ${blocks} block(s)` : ""}`,
    logError: msg => `Conversion failed: ${msg}`,
    logConfigSaved: "Configuration updated for the selected document",
    logBatchStarted: count => `Batch run started for ${count} document(s)`,
    logBatchFinished: count => `Batch run finished for ${count} document(s)`,
    previewPdfCaption: "Scrollable PDF preview",
    previewImageCaption: "Scrollable image preview",
    downloadedWordName: name => `${name}-latex.doc`,
    wordTitle: "LaTeXify Export",
    wordGenerated: "Generated",
    pagesShort: count => `${count} pages`,
    blocksShort: count => `${count} blocks`,
    processingSecondary: name => `Current session: ${name}`
  },
  "zh-Hant": {
    runCurrent: "執行目前文件",
    runAll: "執行全部附件",
    documentsEyebrow: "上傳佇列",
    documentsTitle: "文件列表",
    addFiles: "加入檔案",
    dropzoneTitle: "將 PDF、Word、圖片、文字或 Markdown 檔案拖曳到這裡",
    dropzoneText: "支援批次上傳。每個檔案都會成為獨立的 LaTeX 工作階段與 Word 匯出檔。",
    pickFiles: "選擇檔案",
    typeText: "輸入文字",
    clearAll: "全部清除",
    textModalTitle: "輸入或貼上文字",
    textModalPlaceholder: "輸入或貼上要轉換的數學題目或文字…",
    textCancel: "取消",
    textSubmit: "加入佇列",
    vpnModalTitle: "VPN 連線提醒",
    vpnModalMessage: "使用 LaTeXify 前，請先連線至 VPN。本工具會將請求傳送至 Google Gemini API。",
    vpnModalConfirm: "知道了",
    modelLabel: "AI 模型",
    modelText: "選擇用於轉換的 Gemini 模型。如果呼叫失敗，會自動依序改用其他所有模型。",
    previewEyebrow: "預覽面板",
    previewTitle: "文件預覽",
    emptyPreviewTitle: "尚未選取文件",
    emptyPreviewText: "先上傳一個或多個檔案，再選擇要預覽與轉換的文件。",
    tabConfiguration: "設定",
    tabLogging: "記錄",
    tabResults: "結果",
    copy: "複製",
    exportWord: "匯出 Word",
    configEyebrow: "轉換選項",
    configTitle: "設定",
    optionQuotedTitle: "每題使用引號包住",
    optionQuotedText: "讓每個題目或小題分段更清楚，方便複製與 Word 匯出。",
    optionMathTitle: "保留數學排版",
    optionMathText: "盡量維持方程式、對齊格式與數學符號的原始 LaTeX 表示。",
    optionImageTitle: "保留圖示或印章描述",
    optionImageText: "適合有圖形、校徽、章記或圖片佔位描述的考卷。",
    optionStrictTitle: "僅輸出 LaTeX",
    optionStrictText: "避免模型在轉換結果外加入額外說明文字。",
    customPromptLabel: "額外指示",
    customPromptPlaceholder: "例如：保留原始題號、分數配置，並盡量使用 aligned 環境。",
    configNote: "此版本沿用你原本前端直連的處理方式。若要公開部署，建議把 API 金鑰改成安全的後端代理。",
    loggingEyebrow: "處理軌跡",
    loggingTitle: "記錄",
    resultsEyebrow: "輸出結果",
    progressReady: "準備執行",
    emptyResultTitle: "尚無 LaTeX 結果",
    emptyResultText: "選取文件後按下執行，結果就會在這裡顯示，並可直接反白複製。",
    idle: "閒置中",
    noSelection: "未選取",
    documentType: "類型",
    documentSize: "大小",
    documentPages: "頁數",
    documentBlocks: "區塊",
    mimeImage: "圖片",
    mimeFile: "檔案",
    badgePending: "待處理",
    badgeProcessing: "處理中",
    badgeSuccess: "完成",
    badgeError: "錯誤",
    badgeReady: "就緒",
    queueEmpty: "目前沒有文件，請加入檔案建立工作佇列。",
    queueRemove: "移除",
    queueSelect: "選取",
    statusReady: "準備完成。",
    statusUploaded: count => `已加入 ${count} 個文件。`,
    statusSelected: name => `目前選取：${name}`,
    statusRunning: name => `正在處理 ${name}…`,
    statusSuccess: name => `已完成 ${name} 的轉換。`,
    statusError: msg => `錯誤：${msg}`,
    statusCopied: "已將結果複製到剪貼簿。",
    statusCopiedFailed: "瀏覽器阻擋了剪貼簿操作。",
    statusExported: name => `已將 ${name} 匯出為 Word。`,
    statusNoDocument: "請先上傳並選取文件。",
    statusNoResult: "這份文件目前還沒有可用的 LaTeX 結果。",
    statusCleared: "已清除全部文件。",
    statusBusy: "目前已有文件正在處理，請稍候完成。",
    statusRemoved: name => `已從佇列移除 ${name}。`,
    statusRunAllStarted: count => `已開始執行 ${count} 份附件。`,
    statusRunAllFinished: count => `已完成 ${count} 份文件的批次執行。`,
    statusRunAllSkipped: "所有附件都已完成，不需要再次執行。",
    statusCannotRemoveProcessing: "目前正在處理的文件暫時不能移除。",
    selectedChipReady: "目前文件",
    resultTitleFallback: "結果預覽",
    resultMetaFallback: "0 KB",
    progressProcessing: percent => `處理中… ${percent}%`,
    progressCompleted: "處理完成",
    progressFailed: "處理失敗",
    progressQueued: "等待執行",
    logEmpty: "目前選取的文件還沒有記錄。",
    logQueued: name => `已加入佇列：${name}`,
    logStarted: name => `開始轉換：${name}`,
    logReadingText: "正在讀取檔案文字內容",
    logModelFallback: name => `模型 ${name} 呼叫失敗，改用下一個模型…`,
    previewTextCaption: "文字預覽",
    statusTypedQueued: "已將輸入的文字加入佇列。",
    statusTypedEmpty: "請先輸入或貼上文字。",
    logPdfDirect: "正在以 Gemini 原生文件輸入直接傳送 PDF（不需 OCR）",
    logImageDirect: "正在以 Gemini 原生視覺輸入直接傳送圖片",
    logFileTooLarge: size => `檔案太大，無法直接上傳（${size}）。上限為 18 MB。`,
    logGenerating: "正在產生結構化 LaTeX 結果",
    logCompleted: blocks => `LaTeX 擷取完成${blocks ? ` · ${blocks} 個區塊` : ""}`,
    logError: msg => `轉換失敗：${msg}`,
    logConfigSaved: "已更新目前文件的轉換設定",
    logBatchStarted: count => `已開始批次執行 ${count} 份文件`,
    logBatchFinished: count => `已完成批次執行 ${count} 份文件`,
    previewPdfCaption: "可捲動 PDF 預覽",
    previewImageCaption: "可捲動圖片預覽",
    downloadedWordName: name => `${name}-latex.doc`,
    wordTitle: "LaTeXify 匯出",
    wordGenerated: "產生時間",
    pagesShort: count => `${count} 頁`,
    blocksShort: count => `${count} 區塊`,
    processingSecondary: name => `目前工作階段：${name}`
  }
};

const state = {
  language: localStorage.getItem(LANG_KEY) || "en",
  documents: [],
  currentId: null,
  currentTab: "results",
  isBusy: false,
  batchRunning: false
};

const elements = {
  fileInput: document.getElementById("fileInput"),
  dropzone: document.getElementById("dropzone"),
  clearAllBtn: document.getElementById("clearAllBtn"),
  runAllBtn: document.getElementById("runAllBtn"),
  runCurrentBtn: document.getElementById("runCurrentBtn"),
  sessionList: document.getElementById("sessionList"),
  previewStage: document.getElementById("previewStage"),
  selectedDocumentChip: document.getElementById("selectedDocumentChip"),
  tabButtons: Array.from(document.querySelectorAll(".tab-btn")),
  tabPanels: Array.from(document.querySelectorAll(".tab-panel")),
  copyBtn: document.getElementById("copyBtn"),
  exportWordBtn: document.getElementById("exportWordBtn"),
  configForm: document.getElementById("configForm"),
  customPrompt: document.getElementById("customPrompt"),
  logStream: document.getElementById("logStream"),
  logStatusChip: document.getElementById("logStatusChip"),
  resultDocumentTitle: document.getElementById("resultDocumentTitle"),
  resultMetaChip: document.getElementById("resultMetaChip"),
  progressLabel: document.getElementById("progressLabel"),
  progressPercent: document.getElementById("progressPercent"),
  progressBarFill: document.getElementById("progressBarFill"),
  latexOutput: document.getElementById("latexOutput"),
  resultEmptyState: document.getElementById("resultEmptyState"),
  statusMessage: document.getElementById("statusMessage"),
  statusSecondary: document.getElementById("statusSecondary"),
  languageButtons: Array.from(document.querySelectorAll(".lang-btn")),
  typeTextBtn: document.getElementById("typeTextBtn"),
  textModal: document.getElementById("textModal"),
  textModalArea: document.getElementById("textModalArea"),
  textModalCloseBtn: document.getElementById("textModalCloseBtn"),
  textCancelBtn: document.getElementById("textCancelBtn"),
  textSubmitBtn: document.getElementById("textSubmitBtn"),
  vpnModal: document.getElementById("vpnModal"),
  vpnModalCloseBtn: document.getElementById("vpnModalCloseBtn"),
  vpnModalConfirmBtn: document.getElementById("vpnModalConfirmBtn"),
  modelSelect: document.getElementById("modelSelect")
};

function text() {
  return i18n[state.language] || i18n.en;
}

function defaultOptions() {
  return {
    wrapQuotedBlocks: true,
    preserveMathFormatting: true,
    keepImageDescriptions: true,
    strictLatexOnly: true,
    customPrompt: ""
  };
}

function createDocument(file) {
  const id = (crypto.randomUUID && crypto.randomUUID()) || `doc-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const previewUrl = URL.createObjectURL(file);
  return {
    id,
    file,
    fileName: file.name,
    extensionlessName: file.name.replace(/\.[^.]+$/, "") || file.name,
    fileType: file.type || "application/octet-stream",
    size: file.size || 0,
    previewUrl,
    status: "pending",
    progress: 0,
    rawLatex: "",
    blocks: [],
    pageCount: 0,
    error: "",
    logs: [],
    options: defaultOptions(),
    updatedAt: new Date().toISOString(),
    timerId: null
  };
}

function getCurrentDocument() {
  return state.documents.find(doc => doc.id === state.currentId) || null;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  elements.languageButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === state.language);
  });

  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.dataset.i18n;
    const value = text()[key];
    if (typeof value === "string") node.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
    const key = node.dataset.i18nPlaceholder;
    const value = text()[key];
    if (typeof value === "string") node.setAttribute("placeholder", value);
  });

  const current = getCurrentDocument();
  elements.statusMessage.textContent = current ? text().statusSelected(current.fileName) : text().statusReady;
  elements.statusSecondary.textContent = current ? buildSecondaryStatus(current) : "—";
}

function setLanguage(language) {
  state.language = language;
  localStorage.setItem(LANG_KEY, language);
  applyTranslations();
  render();
}

function setStatus(primary, secondary = "") {
  elements.statusMessage.textContent = primary;
  elements.statusSecondary.textContent = secondary || "—";
}

function addFiles(fileList) {
  const supported = Array.from(fileList || []).filter(isSupportedFile);
  const rejected = Array.from(fileList || []).length - supported.length;
  if (rejected > 0) {
    console.warn(`[LaTeXify] ${rejected} file(s) were skipped: unsupported type. Accepted types are .pdf, .txt, .md, .docx and images.`);
  }
  if (!supported.length) return;

  const created = supported.map(createDocument);
  created.forEach(doc => {
    state.documents.unshift(doc);
    appendLog(doc, "info", text().logQueued(doc.fileName));
    console.log(`[LaTeXify] Queued file: name=${doc.fileName} size=${doc.size} bytes mime=${doc.fileType}`);
  });

  if (!state.currentId && created[0]) {
    state.currentId = created[0].id;
  }

  setStatus(text().statusUploaded(created.length), getCurrentDocument() ? buildSecondaryStatus(getCurrentDocument()) : "—");
  render();
}

function clearAllDocuments() {
  if (state.isBusy) {
    setStatus(text().statusBusy, buildSecondaryStatus(getCurrentDocument()));
    return;
  }

  state.documents.forEach(doc => {
    stopProgressTimer(doc);
    URL.revokeObjectURL(doc.previewUrl);
  });
  state.documents = [];
  state.currentId = null;
  state.batchRunning = false;
  setStatus(text().statusCleared, "—");
  render();
}

function removeDocument(id) {
  const index = state.documents.findIndex(doc => doc.id === id);
  if (index === -1) return;

  const doc = state.documents[index];
  if (doc.status === "processing") {
    setStatus(text().statusCannotRemoveProcessing, buildSecondaryStatus(doc));
    return;
  }

  stopProgressTimer(doc);
  URL.revokeObjectURL(doc.previewUrl);
  state.documents.splice(index, 1);

  if (state.currentId === id) {
    const nextDoc = state.documents[index] || state.documents[index - 1] || state.documents[0] || null;
    state.currentId = nextDoc ? nextDoc.id : null;
  }

  const selected = getCurrentDocument();
  setStatus(text().statusRemoved(doc.fileName), selected ? buildSecondaryStatus(selected) : "—");
  render();
}

function selectDocument(id) {
  if (!id) return;
  state.currentId = id;
  const current = getCurrentDocument();
  syncConfigForm(current);
  setStatus(current ? text().statusSelected(current.fileName) : text().statusReady, current ? buildSecondaryStatus(current) : "—");
  render();
}

function setActiveTab(tabName) {
  state.currentTab = tabName;
  elements.tabButtons.forEach(btn => {
    const active = btn.dataset.tab === tabName;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  elements.tabPanels.forEach(panel => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function render() {
  renderSessionList();
  renderPreview();
  renderConfig();
  renderLogs();
  renderResults();
  renderButtons();
}

function renderSessionList() {
  const t = text();

  if (!state.documents.length) {
    elements.sessionList.innerHTML = `<div class="queue-empty">${escapeHtml(t.queueEmpty)}</div>`;
    return;
  }

  elements.sessionList.innerHTML = state.documents.map(doc => {
    const active = doc.id === state.currentId;
    const meta = [formatBytes(doc.size)];
    if (doc.pageCount) meta.push(t.pagesShort(doc.pageCount));
    if (doc.blocks.length) meta.push(t.blocksShort(doc.blocks.length));

    return `
      <article class="doc-card ${active ? "active" : ""}" data-select-id="${doc.id}" title="${escapeHtml(doc.fileName)}">
        <div class="doc-card-top">
          <h3 class="doc-name">${escapeHtml(doc.fileName)}</h3>
          <span class="status-badge ${doc.status}">${escapeHtml(getStatusLabel(doc.status))}</span>
        </div>
        <div class="doc-meta">${escapeHtml(meta.join(" · "))}</div>
        <div class="doc-card-bottom">
          <span class="selection-chip">${active ? escapeHtml(t.selectedChipReady) : escapeHtml(t.queueSelect)}</span>
          <div class="doc-actions">
            <button type="button" class="doc-remove-btn" data-remove-id="${doc.id}" ${doc.status === "processing" ? "disabled" : ""}>${escapeHtml(t.queueRemove)}</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderPreview() {
  const t = text();
  const current = getCurrentDocument();
  elements.selectedDocumentChip.textContent = current ? current.fileName : t.noSelection;

  if (!current) {
    elements.previewStage.innerHTML = `
      <div class="empty-state preview-empty">
        <div class="empty-icon">📄</div>
        <h3>${escapeHtml(t.emptyPreviewTitle)}</h3>
        <p>${escapeHtml(t.emptyPreviewText)}</p>
      </div>
    `;
    return;
  }

  // Plain text and Markdown: read directly in the browser.
  if (isPlainTextFile(current.file)) {
    elements.previewStage.innerHTML = `
      <div class="preview-image-wrap">
        <div class="preview-caption">${escapeHtml(t.previewTextCaption)}</div>
        <pre class="preview-text" id="textPreview"></pre>
      </div>
    `;
    readFileAsText(current.file)
      .then(content => {
        const target = document.getElementById("textPreview");
        if (target) target.textContent = content.slice(0, 20000);
      })
      .catch(error => {
        console.error("[LaTeXify] Text preview failed:", error);
        const target = document.getElementById("textPreview");
        if (target) target.textContent = `Preview unavailable: ${normalizeError(error)}`;
      });
    return;
  }

  // Word (.docx): extract real text with mammoth.js instead of reading raw
  // binary bytes (this was the cause of the broken Word preview).
  if (isDocxFile(current.file)) {
    elements.previewStage.innerHTML = `
      <div class="preview-image-wrap">
        <div class="preview-caption">${escapeHtml(t.previewTextCaption)}</div>
        <pre class="preview-text" id="textPreview"></pre>
      </div>
    `;
    extractDocxText(current.file)
      .then(content => {
        const target = document.getElementById("textPreview");
        if (target) target.textContent = content ? content.slice(0, 20000) : "(No extractable text found in this document.)";
      })
      .catch(error => {
        console.error("[LaTeXify] DOCX preview failed:", error);
        const target = document.getElementById("textPreview");
        if (target) target.textContent = `Preview unavailable: ${normalizeError(error)}`;
      });
    return;
  }

  if (current.fileType === "application/pdf") {
    elements.previewStage.innerHTML = `
      <div class="preview-image-wrap">
        <div class="preview-caption">${escapeHtml(t.previewPdfCaption)}</div>
        <iframe title="${escapeHtml(current.fileName)}" src="${current.previewUrl}#toolbar=0&navpanes=0&scrollbar=1"></iframe>
      </div>
    `;
    return;
  }

  elements.previewStage.innerHTML = `
    <div class="preview-image-wrap">
      <div class="preview-caption">${escapeHtml(t.previewImageCaption)}</div>
      <img src="${current.previewUrl}" alt="${escapeHtml(current.fileName)}" />
    </div>
  `;
}

function renderConfig() {
  syncConfigForm(getCurrentDocument());
}

function syncConfigForm(current) {
  const options = current ? current.options : defaultOptions();
  elements.configForm.wrapQuotedBlocks.checked = Boolean(options.wrapQuotedBlocks);
  elements.configForm.preserveMathFormatting.checked = Boolean(options.preserveMathFormatting);
  elements.configForm.keepImageDescriptions.checked = Boolean(options.keepImageDescriptions);
  elements.configForm.strictLatexOnly.checked = Boolean(options.strictLatexOnly);
  elements.customPrompt.value = options.customPrompt || "";
}

function renderLogs() {
  const t = text();
  const current = getCurrentDocument();
  const badgeLabel = current ? getStatusLabel(current.status) : t.idle;
  elements.logStatusChip.textContent = badgeLabel;
  elements.logStatusChip.className = `selection-chip ${current ? `status-${current.status}` : ""}`;

  if (!current || !current.logs.length) {
    elements.logStream.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>${escapeHtml(t.loggingTitle)}</h3>
        <p>${escapeHtml(t.logEmpty)}</p>
      </div>
    `;
    return;
  }

  elements.logStream.innerHTML = current.logs.map(entry => `
    <div class="log-row">
      <strong>${escapeHtml(entry.message)}</strong>
      <small>${escapeHtml(entry.time)}</small>
    </div>
  `).join("");
}

function renderResults() {
  const t = text();
  const current = getCurrentDocument();

  elements.resultDocumentTitle.textContent = current ? current.fileName : t.resultTitleFallback;
  elements.resultMetaChip.textContent = current ? buildMetaChip(current) : t.resultMetaFallback;

  if (!current) {
    elements.progressLabel.textContent = t.progressReady;
    elements.progressPercent.textContent = "0%";
    elements.progressBarFill.style.width = "0%";
    elements.latexOutput.textContent = "";
    elements.resultEmptyState.classList.remove("hidden");
    return;
  }

  const progress = Math.round(current.progress || 0);
  elements.progressLabel.textContent = current.status === "processing"
    ? t.progressProcessing(progress)
    : getProgressLabel(current);
  elements.progressPercent.textContent = `${progress}%`;
  elements.progressBarFill.style.width = `${progress}%`;

  if (current.rawLatex) {
    elements.latexOutput.dataset.plainLatex = current.rawLatex;
    elements.latexOutput.textContent = current.rawLatex;
    elements.resultEmptyState.classList.add("hidden");
  } else {
    elements.latexOutput.dataset.plainLatex = "";
    elements.latexOutput.textContent = "";
    elements.resultEmptyState.classList.remove("hidden");
  }
}

function renderButtons() {
  const current = getCurrentDocument();
  const hasResult = Boolean(current && current.rawLatex.trim());
  const hasDocuments = state.documents.length > 0;

  elements.copyBtn.disabled = !hasResult;
  elements.exportWordBtn.disabled = !hasResult;
  elements.runCurrentBtn.disabled = !current || state.isBusy;
  elements.clearAllBtn.disabled = !hasDocuments || state.isBusy;
  elements.runAllBtn.disabled = !hasDocuments || state.isBusy;
}

function handleConfigChange() {
  const current = getCurrentDocument();
  if (!current) return;

  current.options = {
    wrapQuotedBlocks: elements.configForm.wrapQuotedBlocks.checked,
    preserveMathFormatting: elements.configForm.preserveMathFormatting.checked,
    keepImageDescriptions: elements.configForm.keepImageDescriptions.checked,
    strictLatexOnly: elements.configForm.strictLatexOnly.checked,
    customPrompt: elements.customPrompt.value.trim()
  };
  current.updatedAt = new Date().toISOString();
  appendLog(current, "info", text().logConfigSaved);
  setStatus(text().statusSelected(current.fileName), buildSecondaryStatus(current));
  renderLogs();
}

function runCurrentDocument() {
  const current = getCurrentDocument();
  if (!current) {
    setStatus(text().statusNoDocument, "—");
    return;
  }
  runDocument(current.id);
}


async function runAllDocuments() {
  if (!state.documents.length) {
    setStatus(text().statusNoDocument, "—");
    return;
  }
  if (state.isBusy) {
    setStatus(text().statusBusy, buildSecondaryStatus(getCurrentDocument()));
    return;
  }

  const candidates = state.documents.filter(doc => doc.status !== "processing");
  const needsWork = candidates.filter(doc => doc.status !== "success");
  const queue = needsWork.length ? needsWork : candidates;

  if (!queue.length) {
    setStatus(text().statusRunAllSkipped, buildSecondaryStatus(getCurrentDocument()));
    return;
  }

  state.batchRunning = true;
  setActiveTab("results");
  setStatus(text().statusRunAllStarted(queue.length), buildSecondaryStatus(queue[0]));
  queue.forEach(doc => appendLog(doc, "info", text().logBatchStarted(queue.length)));
  renderButtons();

  for (const doc of queue) {
    await runDocument(doc.id, { fromBatch: true });
  }

  state.batchRunning = false;
  const current = getCurrentDocument();
  queue.forEach(doc => appendLog(doc, "success", text().logBatchFinished(queue.length)));
  setStatus(text().statusRunAllFinished(queue.length), current ? buildSecondaryStatus(current) : "—");
  render();
}

async function runDocument(id, options = {}) {
  const current = state.documents.find(doc => doc.id === id);
  if (!current) return false;

    if (current.status === "success") {
    setStatus("Already processed", buildSecondaryStatus(current));
    const runBtn = document.getElementById("runCurrentBtn");
    if (runBtn) runBtn.disabled = true; // disable the button
    return false;
  }
  
  if (state.isBusy && current.status !== "processing") {
    setStatus(text().statusBusy, buildSecondaryStatus(getCurrentDocument() || current));
    return false;
  }

  state.currentId = id;
  setActiveTab("results");
  syncConfigForm(current);

  state.isBusy = true;
  current.status = "processing";
  current.progress = 4;
  current.error = "";
  current.rawLatex = "";
  current.blocks = [];
  current.pageCount = 0;
  current.updatedAt = new Date().toISOString();
  appendLog(current, "info", text().logStarted(current.fileName));
  setStatus(text().statusRunning(current.fileName), text().processingSecondary(current.fileName));
  startProgressTimer(current);
  render();

  try {
    // Build the request parts. PDFs and images are attached natively
    // (inline base64) — there is NO separate OCR step anymore.
    const parts = await buildRequestParts(current);
    current.progress = Math.max(current.progress, 58);
    render();

    appendLog(current, "info", text().logGenerating);
    const rawLatex = await generateLatexFromParts(parts, current.options, current);
    const blocks = splitQuotedBlocks(rawLatex);

    current.rawLatex = rawLatex.trim();
    current.blocks = blocks;
    current.status = "success";
    current.progress = 100;
    current.updatedAt = new Date().toISOString();
    appendLog(current, "success", text().logCompleted(blocks.length));
    setStatus(text().statusSuccess(current.fileName), buildSecondaryStatus(current));
    return true;
  } catch (error) {
    console.error(error);
    current.status = "error";
    current.progress = 100;
    current.error = normalizeError(error);
    current.updatedAt = new Date().toISOString();
    appendLog(current, "error", text().logError(current.error));
    setStatus(text().statusError(current.error), buildSecondaryStatus(current));
    return false;
  } finally {
    stopProgressTimer(current);
    state.isBusy = false;
    if (!options.fromBatch) state.batchRunning = false;
    render();
  }
}

function startProgressTimer(doc) {
  stopProgressTimer(doc);
  doc.timerId = setInterval(() => {
    if (doc.status !== "processing") return;
    doc.progress = Math.min(doc.progress + (doc.progress < 50 ? 7 : 3), 55);
    if (doc.id === state.currentId) renderResults();
    renderSessionList();
    renderButtons();
  }, 400);
}

function stopProgressTimer(doc) {
  if (!doc?.timerId) return;
  clearInterval(doc.timerId);
  doc.timerId = null;
}

// ============================================================
// Request building
// ============================================================

// Builds the `parts` array for the Gemini generateContent call.
// - .txt / .md / .docx  -> extracted text inside the LaTeX prompt.
// - .pdf                -> native Gemini document input (inline base64). No OCR.
// - images              -> native Gemini vision input (inline base64).
async function buildRequestParts(doc) {
  const file = doc.file;

  if (isPlainTextFile(file) || isDocxFile(file)) {
    appendLog(doc, "info", text().logReadingText);
    const content = await extractTextFromFile(file);
    console.log(`[LaTeXify] Extracted text from ${file.name}: ${content.length} characters.`);
    if (!content) {
      throw new Error(`No text could be extracted from ${file.name}. The file may be empty, scanned, or corrupted.`);
    }
    return [{ text: buildPrompt(doc.options, content) }];
  }

  // PDF / image: Gemini native multimodal file input.
  if (file.size > GEMINI_MAX_INLINE_BYTES) {
    const message = text().logFileTooLarge(formatBytes(file.size));
    console.error(`[LaTeXify] ${message} name=${file.name} size=${file.size}`);
    appendLog(doc, "error", message);
    throw new Error(message);
  }

  const { mimeType, base64Data } = await readFileAsInlineBase64(file);
  console.log(
    `[LaTeXify] Prepared native file input: name=${file.name} mime=${mimeType} size=${file.size} bytes base64Length=${base64Data.length}`
  );

  if (file.type === "application/pdf") {
    appendLog(doc, "info", text().logPdfDirect);
    return [
      { text: buildPrompt(doc.options, "") },
      {
        text: "The OCR content above is provided as the attached PDF document. Read every page of the attached PDF (including scanned or image-based pages) and convert its full content."
      },
      { inline_data: { mime_type: "application/pdf", data: base64Data } }
    ];
  }

  if ((file.type || "").startsWith("image/")) {
    appendLog(doc, "info", text().logImageDirect);
    return [
      { text: buildPrompt(doc.options, "") },
      {
        text: "The OCR content above is provided as the attached image. Read all visible text in the attached image and convert it."
      },
      { inline_data: { mime_type: file.type, data: base64Data } }
    ];
  }

  throw new Error(`Unsupported file type: ${file.name} (${file.type || "unknown MIME type"}).`);
}

// Reads the file as base64 and strips the data-URL prefix
// ("data:application/pdf;base64," etc.) — sending the full data URL
// inside inline_data is a common cause of garbled/failed PDF reads.
async function readFileAsInlineBase64(file) {
  const dataUrl = await readFileAsDataUrl(file);
  const marker = "base64,";
  const markerIndex = dataUrl.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Failed to base64-encode ${file.name}.`);
  }
  return {
    mimeType: file.type || "application/octet-stream",
    base64Data: dataUrl.slice(markerIndex + marker.length)
  };
}

// ============================================================
// Gemini API (Google AI Studio) — the only GenAI provider
// ============================================================

async function generateLatexFromParts(parts, options, doc) {
  const systemInstruction = "You convert OCR text into raw LaTeX only. Respect the user's formatting rules exactly and do not add commentary.";
  const preferredModel = getSelectedModel();

  // Fallback order: the user's selection first, then every remaining model
  // in the fixed GEMINI_MODELS order.
  const ordered = [preferredModel, ...GEMINI_MODELS.filter(model => model !== preferredModel)];
  let lastError = null;
  let previousModel = null;

  for (const modelName of ordered) {
    if (previousModel && doc) {
      appendLog(doc, "warning", text().logModelFallback(previousModel));
      renderLogs();
    }
    previousModel = modelName;

    try {
      console.log(`[LaTeXify] Trying Gemini model: ${modelName}`);
      const result = await callGemini(modelName, systemInstruction, parts);
      console.log(`[LaTeXify] Success with model: ${modelName}`);
      return result;
    } catch (error) {
      lastError = error;
      console.error(`[LaTeXify] Model ${modelName} failed:`, error);
    }
  }

  console.error("[LaTeXify] All Gemini models failed. Last error:", lastError);
  throw new Error(ALL_MODELS_UNAVAILABLE_MESSAGE);
}

async function callGemini(modelName, systemInstruction, parts) {
  // 1. 將請求路徑改為呼叫你自己的 Vercel 後端 API
  const endpoint = "/api/gemini";
  
  const payloadSummary = parts
    .map(part => part.text ? `text(${part.text.length} chars)` : `inline_data(${part.inline_data?.mime_type || "?"})`)
    .join(", ");
  console.log(`[LaTeXify] Vercel Proxy request → POST ${endpoint} model=${modelName} parts=[${payloadSummary}]`);

  // 2. 發送請求給 Vercel Serverless Function
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 安全：這裡完全不需要帶任何 API Key 了！
    },
    body: JSON.stringify({
      modelName,          // 傳遞模型名稱
      systemInstruction,  // 傳遞系統提示詞
      parts              // 傳遞使用者的輸入內容
    })
  });
  
  await ensureOk(response, `Gemini (${modelName}) proxy request failed.`);
  const json = await response.json();
  const candidate = json?.candidates?.[0];
  if (candidate?.finishReason && candidate.finishReason !== "STOP" && candidate.finishReason !== "MAX_TOKENS") {
    console.warn(`[LaTeXify] Gemini finishReason: ${candidate.finishReason}`, json);
  }
  const outParts = candidate?.content?.parts;
  if (!Array.isArray(outParts)) {
    console.error("[LaTeXify] Unexpected Gemini response shape:", json);
    throw new Error("Gemini response did not contain any content parts.");
  }
  const output = outParts.map(part => (typeof part?.text === "string" ? part.text : "")).join("").trim();
  if (!output) {
    throw new Error("Gemini returned an empty response.");
  }
  return output;
}

function getSelectedModel() {
  return elements.modelSelect?.value || localStorage.getItem(MODEL_STORAGE_KEY) || GEMINI_DEFAULT_MODEL;
}

function handleModelChange() {
  localStorage.setItem(MODEL_STORAGE_KEY, elements.modelSelect.value);
  console.log(`[LaTeXify] Preferred Gemini model set to: ${elements.modelSelect.value}`);
}

// ============================================================
// LaTeX prompt — kept byte-identical to the original app.
// ============================================================

function buildPrompt(options, markdown) {
  const instructions = [];

  if (options.wrapQuotedBlocks) {
    instructions.push("Wrap each question, sub-question, section title, and standalone instruction in double quotes.");
  }
  if (options.preserveMathFormatting) {
    instructions.push("Preserve mathematical notation in valid raw LaTeX, including equations, cases, matrices, aligned expressions, and symbols.");
  }
  if (options.keepImageDescriptions) {
    instructions.push("Keep concise bracketed descriptions for meaningful figures, logos, stamps, or image placeholders when they appear in the source.");
  }
  if (options.strictLatexOnly) {
    instructions.push("Do not add commentary, summaries, markdown fences, or explanatory prose outside the converted LaTeX output.");
  }

  instructions.push("For each math symbol, ensure it is enclosed in $...$ with no extra spaces inside the delimiters (e.g. replace \"$ n $\" with \"$n$\") so MathType in Word can reliably detect math.");

  instructions.push("Keep numbering, mark allocations, punctuation, and section hierarchy as close to the source as possible.");

  if (options.customPrompt) {
    instructions.push(`Additional instruction: ${options.customPrompt}`);
  }

  return [
    "Convert the following OCR content into raw LaTeX.",
    ...instructions.map((line, index) => `${index + 1}. ${line}`),
    "",
    "OCR content:",
    markdown || ""
  ].join("\n");
}

async function copyCurrentResult() {
  const current = getCurrentDocument();
  if (!current || !current.rawLatex.trim()) {
    setStatus(text().statusNoResult, buildSecondaryStatus(current));
    return;
  }
  try {
    await navigator.clipboard.writeText(current.rawLatex);
    setStatus(text().statusCopied, buildSecondaryStatus(current));
  } catch (error) {
    setStatus(text().statusCopiedFailed, buildSecondaryStatus(current));
  }
}

function exportCurrentWord() {
  const current = getCurrentDocument();
  if (!current || !current.rawLatex.trim()) {
    setStatus(text().statusNoResult, buildSecondaryStatus(current));
    return;
  }

  // Escape HTML first, then highlight $...$ including delimiters
  let highlightedLatex = escapeHtml(current.rawLatex).replace(/\$(.*?)\$/gs, (match) => {
    return `<span style="color:red; background:yellow;">${match}</span>`;
  });

  // Replace newlines with <br> so Word respects row changes
  highlightedLatex = highlightedLatex.replace(/\n/g, "<br>");

  const docHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(text().wordTitle)}</title>
  <style>
    body {
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      margin: 32px;
      line-height: 1.6;
      color: #000;
    }
    h1 {
      color: #2b67da;
      margin-bottom: 6px;
    }
    .meta {
      color: #61748a;
      margin-bottom: 18px;
    }
    .content {
      word-break: break-word;
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(current.fileName)}</h1>
  <div class="meta">${escapeHtml(text().wordGenerated)}: ${escapeHtml(formatTimestamp(current.updatedAt))}</div>
  <div class="content">${highlightedLatex}</div>
</body>
</html>`;

  const fileName = text().downloadedWordName(current.extensionlessName);
  downloadBlob(new Blob([docHtml], { type: "application/msword" }), fileName);
  setStatus(text().statusExported(fileName), buildSecondaryStatus(current));
}


function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = sanitizeFileName(fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function appendLog(doc, level, message) {
  doc.logs.unshift({
    level,
    message,
    time: formatTimestamp(new Date().toISOString())
  });
}

function getStatusLabel(status) {
  const t = text();
  const map = {
    pending: t.badgePending,
    processing: t.badgeProcessing,
    success: t.badgeSuccess,
    error: t.badgeError
  };
  return map[status] || t.badgeReady;
}

function getProgressLabel(doc) {
  const t = text();
  if (doc.status === "success") return t.progressCompleted;
  if (doc.status === "error") return t.progressFailed;
  if (doc.status === "processing") return t.progressProcessing(Math.round(doc.progress || 0));
  return t.progressQueued;
}

function buildMetaChip(doc) {
  const t = text();
  const pieces = [formatBytes(doc.size)];
  if (doc.pageCount) pieces.push(t.pagesShort(doc.pageCount));
  if (doc.blocks.length) pieces.push(t.blocksShort(doc.blocks.length));
  return pieces.join(" · ");
}

function buildSecondaryStatus(doc) {
  if (!doc) return "—";
  const t = text();
  const parts = [detectTypeLabel(doc.fileType), formatBytes(doc.size)];
  if (doc.pageCount) parts.push(t.pagesShort(doc.pageCount));
  if (doc.blocks.length) parts.push(t.blocksShort(doc.blocks.length));
  return parts.join(" · ");
}

async function ensureOk(response, fallbackMessage) {
  if (response.ok) return;
  let details = fallbackMessage;
  try {
    const data = await response.json();
    const apiMessage = data?.message || data?.error?.message || data?.detail || JSON.stringify(data);
    if (apiMessage) details = apiMessage;
  } catch (_) {
    try {
      const plain = await response.text();
      if (plain) details = plain;
    } catch (_) {
      // no-op
    }
  }
  throw new Error(details || fallbackMessage);
}

function splitQuotedBlocks(value) {
  const source = String(value || "").trim();
  const blocks = [];
  const regex = /"((?:\\.|[^"\\])*)"/gs;
  let match;
  while ((match = regex.exec(source)) !== null) {
    blocks.push(match[1].replace(/\\"/g, '"').trim());
  }
  if (blocks.length) return blocks;
  return source.split(/\n\s*\n+/).map(item => item.trim()).filter(Boolean);
}

function detectTypeLabel(mime) {
  const t = text();
  if (mime === "application/pdf") return "PDF";
  if ((mime || "").startsWith("image/")) return t.mimeImage;
  if (mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "DOCX";
  if (mime === "text/markdown") return "MD";
  if (mime === "text/plain") return "TXT";
  return t.mimeFile;
}

function isSupportedFile(file) {
  if (!file) return false;
  if (file.type === "application/pdf") return true;
  if ((file.type || "").startsWith("image/")) return true;
  return isPlainTextFile(file) || isDocxFile(file);
}

function isPlainTextFile(file) {
  if (!file) return false;
  const name = (file.name || "").toLowerCase();
  return name.endsWith(".txt") || name.endsWith(".md") ||
    file.type === "text/plain" || file.type === "text/markdown";
}

function isDocxFile(file) {
  if (!file) return false;
  const name = (file.name || "").toLowerCase();
  return name.endsWith(".docx") ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
}

async function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error(`Failed to read text from ${file.name}.`));
    reader.readAsText(file);
  });
}

async function extractDocxText(file) {
  try {
    if (typeof mammoth === "undefined" || !mammoth?.extractRawText) {
      throw new Error("DOCX parser (mammoth.js) is not available. Check your internet connection.");
    }
    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}.`));
      reader.readAsArrayBuffer(file);
    });
    const result = await mammoth.extractRawText({ arrayBuffer });
    if (result?.messages?.length) {
      console.warn("[LaTeXify] DOCX parser warnings:", result.messages);
    }
    return String(result?.value || "").trim();
  } catch (error) {
    console.error(`[LaTeXify] DOCX parsing failed for ${file.name}:`, error);
    throw error;
  }
}

async function extractTextFromFile(file) {
  try {
    if (isPlainTextFile(file)) {
      return (await readFileAsText(file)).trim();
    }
    if (isDocxFile(file)) {
      return await extractDocxText(file);
    }
    throw new Error(`Unsupported text file type: ${file.name}`);
  } catch (error) {
    console.error(`[LaTeXify] File parsing failed for ${file.name}:`, error);
    throw error;
  }
}

function addTypedTextDocument() {
  const content = elements.textModalArea.value;
  if (!content.trim()) {
    setStatus(text().statusTypedEmpty, "—");
    return;
  }

  const fileName = `typed-text-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.txt`;
  const file = new File([content], fileName, { type: "text/plain" });
  closeTextModal();
  addFiles([file]);
  const firstDoc = state.documents.find(doc => doc.fileName === fileName);
  if (firstDoc) {
    selectDocument(firstDoc.id);
    setActiveTab("results");
  }
  setStatus(text().statusTypedQueued, "—");
}

function openTextModal() {
  elements.textModal.classList.remove("hidden");
  elements.textModalArea.value = "";
  elements.textModalArea.focus();
}

function closeTextModal() {
  elements.textModal.classList.add("hidden");
}

function closeVpnModal() {
  elements.vpnModal.classList.add("hidden");
  sessionStorage.setItem("latexify-vpn-reminder-seen", "true");
}

function showVpnReminder() {
  if (sessionStorage.getItem("latexify-vpn-reminder-seen") === "true") return;
  elements.vpnModal.classList.remove("hidden");
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${size >= 100 || index === 0 ? Math.round(size) : size.toFixed(1)} ${units[index]}`;
}

function formatTimestamp(input) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(state.language === "zh-Hant" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

function sanitizeFileName(name) {
  return String(name || "latexify-output")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeError(error) {
  return error?.message || String(error || "Unknown error");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

elements.languageButtons.forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

elements.fileInput.addEventListener("change", event => {
  addFiles(event.target.files);
  event.target.value = "";
});

["dragenter", "dragover"].forEach(eventName => {
  elements.dropzone.addEventListener(eventName, event => {
    event.preventDefault();
    event.stopPropagation();
    elements.dropzone.classList.add("dragover");
  });
});

["dragleave", "dragend", "drop"].forEach(eventName => {
  elements.dropzone.addEventListener(eventName, event => {
    event.preventDefault();
    event.stopPropagation();
    if (eventName !== "drop") elements.dropzone.classList.remove("dragover");
  });
});

elements.dropzone.addEventListener("drop", event => {
  elements.dropzone.classList.remove("dragover");
  addFiles(event.dataTransfer.files);
});

elements.dropzone.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    elements.fileInput.click();
  }
});

elements.clearAllBtn.addEventListener("click", clearAllDocuments);

elements.runAllBtn.addEventListener("click", () => {
  runAllDocuments();
});

elements.runCurrentBtn.addEventListener("click", runCurrentDocument);

elements.copyBtn.addEventListener("click", copyCurrentResult);

elements.exportWordBtn.addEventListener("click", exportCurrentWord);

elements.tabButtons.forEach(button => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

elements.sessionList.addEventListener("click", event => {
  const removeButton = event.target.closest("[data-remove-id]");
  if (removeButton) {
    event.stopPropagation();
    removeDocument(removeButton.dataset.removeId);
    return;
  }

  const card = event.target.closest("[data-select-id]");
  if (card) {
    selectDocument(card.dataset.selectId);
  }
});

elements.configForm.addEventListener("input", handleConfigChange);

elements.typeTextBtn.addEventListener("click", openTextModal);
elements.textModalCloseBtn.addEventListener("click", closeTextModal);
elements.textCancelBtn.addEventListener("click", closeTextModal);
elements.textSubmitBtn.addEventListener("click", addTypedTextDocument);
elements.textModal.addEventListener("click", event => {
  if (event.target === elements.textModal) closeTextModal();
});

elements.vpnModalCloseBtn.addEventListener("click", closeVpnModal);
elements.vpnModalConfirmBtn.addEventListener("click", closeVpnModal);
elements.vpnModal.addEventListener("click", event => {
  if (event.target === elements.vpnModal) closeVpnModal();
});

elements.modelSelect.addEventListener("change", handleModelChange);
(function initModelSelect() {
  const saved = localStorage.getItem(MODEL_STORAGE_KEY);
  if (saved && GEMINI_MODELS.includes(saved)) {
    elements.modelSelect.value = saved;
  } else {
    elements.modelSelect.value = GEMINI_DEFAULT_MODEL;
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const previewPanel = document.querySelector(".preview-panel");

  if (previewPanel) {
    // Create a wrapper div
    const scrollWrapper = document.createElement("div");
    scrollWrapper.classList.add("preview-scroll-wrapper");

    // Move all children into the wrapper
    while (previewPanel.firstChild) {
      scrollWrapper.appendChild(previewPanel.firstChild);
    }

    // Append wrapper back into preview panel
    previewPanel.appendChild(scrollWrapper);
  }
});

function getPlainLatexOutput(outputEl) {
  return outputEl.dataset.plainLatex || outputEl.textContent || "";
}

function highlightLatexText(value) {
  // Match longer delimiters first so $$...$$ is not consumed as two empty $...$ pairs.
  const mathPattern = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\\begin\{(?:align\*?|equation\*?|gather\*?|multline\*?)[^}]*\}[\s\S]*?\\end\{(?:align\*?|equation\*?|gather\*?|multline\*?)\}|(?<!\\)\$(?:\\.|[^$\r\n])*?(?<!\\)\$)/g;
  let highlighted = "";
  let lastIndex = 0;
  let match;

  while ((match = mathPattern.exec(value)) !== null) {
    highlighted += escapeHtml(value.slice(lastIndex, match.index));
    highlighted += `<span class="latex-math-highlight">${escapeHtml(match[0])}</span>`;
    lastIndex = match.index + match[0].length;
  }

  highlighted += escapeHtml(value.slice(lastIndex));
  return highlighted.replace(/\n/g, "<br>");
}

document.getElementById("highlightOnBtn").addEventListener("click", () => {
  const outputEl = document.getElementById("latexOutput");
  const content = getPlainLatexOutput(outputEl);
  outputEl.dataset.plainLatex = content;
  outputEl.innerHTML = highlightLatexText(content);
});

document.getElementById("highlightOffBtn").addEventListener("click", () => {
  const outputEl = document.getElementById("latexOutput");
  const plain = getPlainLatexOutput(outputEl);
  outputEl.dataset.plainLatex = plain;
  outputEl.textContent = plain;
});




setLanguage(state.language);
setActiveTab(state.currentTab);
render();
showVpnReminder();

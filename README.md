# Lieflat HTML Design

给 Agent 用的 HTML 视觉设计 Skill 合集，按交付形态拆成横向 HTML 演示、小红书长文竖图和小红书封面首图。

这个仓库不只是放了一堆静态 HTML 文件，而是把一组单文件 HTML 视觉系统打包成可复用的 Agent Skills。Codex、Claude Code、Moxt 等工具可以读取对应 skill 的 catalog 和风格理解文件，按交付形态、主题、受众和输出格式选择视觉方向，整理内容结构，并用浏览器截图检查最终版面。

内置 12 组风格差异明显的演示模板，每组都提供中文和英文版本：从 Y2K 品牌手册、技术分析，到咨询报告、雨天笔记、图片叙事都能覆盖。另有两类小红书模板：长文模板使用 `600×1000` CSS 卡片并导出 `1200×2000` 高清 PNG；封面模板使用 `600×800` CSS 卡片并导出 `1200×1600` 高清 PNG。

英文版见 [README.en.md](./README.en.md)。

## 包含内容

- 4 个可安装 skill：总入口、HTML deck、小红书长文、小红书封面
- `lieflat-html-deck`：12 组 PPT / 演示视觉风格，每组都包含中文和英文版本
- `lieflat-xhs-longform`：11 组小红书长文模板，默认中文，适合导出 `3:5` 竖图
- `lieflat-xhs-cover`：11 组小红书封面模板，默认中文，适合导出 `3:4` 首图
- 每个生产 skill 都有自己的 `assets/catalog.json`、模板、风格理解文件和截图脚本

## Skill 结构

| Skill | 用途 |
|------|------|
| `lieflat-html-design` | 总入口：判断用户需要 deck、长文图还是封面图 |
| `lieflat-html-deck` | 横向 HTML 演示，内含 12 组 PPT 风格 |
| `lieflat-xhs-longform` | 小红书长文竖图，内含 11 组长文风格 |
| `lieflat-xhs-cover` | 小红书封面首图，内含 11 组封面风格 |

## 使用场景及推荐模板

| 场景 | 推荐模板 | 适合原因 |
|------|----------|----------|
| 公司战略、行业研究、投资人叙事 | 咨询报告、简约测评 | 信息可信、结构清晰，适合严肃观点和决策材料 |
| AI 系统、模型简报、技术趋势分析 | 点阵编辑风、极客风格、黑底闪光 | 技术感强，能承载指标、流程、系统性判断 |
| 产品测评、竞品对比、工具观察 | 简约测评、雨天手记、极客风格 | 适合优缺点拆解、体验笔记和克制表达 |
| 创作者品牌、社交账号、互联网文化 | Y2K 手册、杂志风 | 更有个性，适合身份系统、栏目包装和社区表达 |
| 品牌营销、生活方式、精品活动 | 日光、杂志风 | 氛围更温暖，适合高级感叙事和轻商业提案 |
| 摄影作品集、产品视觉、客户案例 | 作品集、故事集 | 以图片为中心，适合真实素材和项目故事 |
| 项目复盘、田野报告、人物/地点故事 | 故事集、杂志风 | 叙事节奏更强，适合图文并行的长线表达 |

如果不确定用哪个模板，直接让 Agent 使用 `lieflat-html-design` 总入口；如果已经知道交付形态，也可以直接点名 `lieflat-html-deck`、`lieflat-xhs-longform` 或 `lieflat-xhs-cover`。

## PPT 模板预览

这组模板故意拉开了风格跨度：覆盖创作者身份系统、技术分析、咨询报告、安静编辑风、高级品牌营销、严肃评估，以及图片主导的作品集。

GitHub README 会直接渲染仓库里的相对路径图片。下面这些预览图来自 `previews/zh/*.png`，提交到 GitHub 后就会像普通图片一样显示。

### 技术型 / 系统

<table>
  <tr>
    <td width="33%"><img src="./previews/zh/geek-report.png" alt="极客风格 Geek Report 预览"><br><strong>极客风格 · Geek Report</strong><br>极客气质、终端纸面、技术观点表达。</td>
    <td width="33%"><img src="./previews/zh/pixel-report.png" alt="黑底闪光 Pixel Report 预览"><br><strong>黑底闪光 · Pixel Report</strong><br>暗色网格、像素 HUD、技术指标拆解。</td>
    <td width="33%"><img src="./previews/zh/dot-matrix-dark.png" alt="点阵编辑风 Dot Matrix 预览"><br><strong>点阵编辑风 · Dot Matrix</strong><br>点阵场、明暗变体、信号感表达。</td>
  </tr>
  <tr>
    <td width="33%"><img src="./previews/zh/clean-review.png" alt="简约测评 Clean Review 预览"><br><strong>简约测评 · Clean Review</strong><br>极简克制、清晰对比、严肃分析。</td>
    <td width="33%"><img src="./previews/zh/shiny-tiles.png" alt="镭射网格 Shiny Tiles 预览"><br><strong>镭射网格 · Shiny Tiles</strong><br>黑底网格、银色玻璃卡、冷光技术视觉。</td>
    <td width="33%"></td>
  </tr>
</table>

### 高级感 / 编辑叙事

<table>
  <tr>
    <td width="33%"><img src="./previews/zh/editorial.png" alt="杂志风 Editorial 预览"><br><strong>杂志风 · Editorial</strong><br>杂志式文章结构，留白克制。</td>
    <td width="33%"><img src="./previews/zh/consulting-report.png" alt="咨询报告 Consulting Report 预览"><br><strong>咨询报告 · Consulting Report</strong><br>咨询报告、行业研究、高信任叙事。</td>
    <td width="33%"><img src="./previews/zh/sunrise.png" alt="日光 Sunrise 预览"><br><strong>日光 · Sunrise</strong><br>暖调留白、优雅标题、适合高级叙事。</td>
  </tr>
  <tr>
    <td width="33%"><img src="./previews/zh/rain-notes.png" alt="雨天手记 Rain Notes 预览"><br><strong>雨天手记 · Rain Notes</strong><br>柔和纸感、安静动效、适合测评笔记。</td>
    <td width="33%"><img src="./previews/zh/story-field.png" alt="故事集 Story Field 预览"><br><strong>故事集 · Story Field</strong><br>纪实影像、档案气质、电影感横向叙事。</td>
    <td width="33%"></td>
  </tr>
</table>

### 表达型 / 创作者

<table>
  <tr>
    <td width="50%"><img src="./previews/zh/y2k-brand.png" alt="Y2K 手册 Y2K Manual 预览"><br><strong>Y2K 手册 · Y2K Manual</strong><br>千禧网页、金属字、闪光、像素窗口。</td>
    <td width="50%"><img src="./previews/zh/studio-photo.png" alt="作品集 Studio Photo 预览"><br><strong>作品集 · Studio Photo</strong><br>以物件和摄影为中心的作品集系统。</td>
  </tr>
</table>

## 小红书封面模板

小红书封面模板用于第一张图，不是长文阅读卡。这里展示 4 个常用方向，默认导出 `1200×1600` PNG。

<table>
  <tr>
    <td width="25%"><img src="./previews/zh/xhs-cover-editorial.png" alt="小红书封面 杂志风 预览"><br><strong>杂志风</strong></td>
    <td width="25%"><img src="./previews/zh/xhs-cover-geek-report.png" alt="小红书封面 极客风格 预览"><br><strong>极客风格</strong></td>
    <td width="25%"><img src="./previews/zh/xhs-cover-consulting-report.png" alt="小红书封面 咨询报告 预览"><br><strong>咨询报告</strong></td>
    <td width="25%"><img src="./previews/zh/xhs-cover-sunrise.png" alt="小红书封面 日光 预览"><br><strong>日光</strong></td>
  </tr>
</table>

## 小红书长文模板

小红书长文模板会把视觉风格重新排成连续文章卡。这里展示 4 个常用方向，默认导出 `1200×2000` PNG。

<table>
  <tr>
    <td width="25%"><img src="./previews/zh/xhs-editorial.png" alt="小红书长文 杂志风 预览"><br><strong>杂志风</strong></td>
    <td width="25%"><img src="./previews/zh/xhs-geek-report.png" alt="小红书长文 极客风格 预览"><br><strong>极客风格</strong></td>
    <td width="25%"><img src="./previews/zh/xhs-consulting-report.png" alt="小红书长文 咨询报告 预览"><br><strong>咨询报告</strong></td>
    <td width="25%"><img src="./previews/zh/xhs-sunrise.png" alt="小红书长文 日光 预览"><br><strong>日光</strong></td>
  </tr>
</table>

## 安装

### 无痛安装

最简单的方式：把这个仓库链接丢给你的 Codex / Claude Code / Moxt / 其他本地 Agent，让它帮你安装。

```text
帮我安装 Lieflat HTML Design：
https://github.com/larashero3-dotcom/lieflat-html-design

请把仓库里的 4 个 skills 安装到我的用户级 skills 目录，并验证这几个文件都存在：
- lieflat-html-design/SKILL.md
- lieflat-html-deck/SKILL.md
- lieflat-xhs-longform/SKILL.md
- lieflat-xhs-cover/SKILL.md
```

已经安装过的话，把这段话发给 Agent 更新：

```text
帮我更新 Lieflat HTML Design：
https://github.com/larashero3-dotcom/lieflat-html-design

请进入本地安装目录执行 git pull，或重新复制最新的 4 个 skills，然后告诉我当前 commit。
```

### 手动安装

如果你想自己动手，可以 clone 后一次性复制 4 个 skills。

安装到 Codex 用户级目录：

```bash
git clone https://github.com/larashero3-dotcom/lieflat-html-design
cd lieflat-html-design
mkdir -p ~/.codex/skills
cp -R skills/lieflat-html-design skills/lieflat-html-deck skills/lieflat-xhs-longform skills/lieflat-xhs-cover ~/.codex/skills/
```

安装到 Codex 项目级目录：

```bash
mkdir -p .agents/skills
cp -R skills/lieflat-html-design skills/lieflat-html-deck skills/lieflat-xhs-longform skills/lieflat-xhs-cover .agents/skills/
```

安装到 Claude Code 用户级目录：

```bash
mkdir -p ~/.claude/skills
cp -R skills/lieflat-html-design skills/lieflat-html-deck skills/lieflat-xhs-longform skills/lieflat-xhs-cover ~/.claude/skills/
```

安装到 Claude Code 项目级目录：

```bash
mkdir -p .claude/skills
cp -R skills/lieflat-html-design skills/lieflat-html-deck skills/lieflat-xhs-longform skills/lieflat-xhs-cover .claude/skills/
```

## 使用方式

安装后，这组 skills 也可以在 Moxt.ai 等支持读取项目文件或自定义技能的 Agent 工作区中使用。

可以这样要求你的 Agent：

```txt
用 lieflat-html-deck 做一份面向公司内部的中文战略演示。
```

```txt
用 lieflat-html-deck 做一份创作者品牌手册，请根据内容选择最合适的视觉风格。
```

```txt
用 lieflat-html-deck 做一份图片主导的产品作品集，我会提供可用图片。
```

```txt
用 lieflat-xhs-longform 做一张小红书长文图，风格用日光，内容是测评一个 AI 产品。
```

```txt
用 lieflat-xhs-cover 做一张小红书封面，风格用点阵编辑风，主题是 AI 系统观察。
```

如果还不确定要做哪种形态，可以直接说：

```txt
用 lieflat-html-design 帮我把这段内容做成适合发布的 HTML 视觉稿。
```

Agent 会先路由到对应 skill，再读取该 skill 的 `assets/catalog.json` 和 `references/style-understanding.md`，选择合适模板，复制到目标项目，重组内容、调整版式，并运行截图检查。

## 指定风格

如果已经有想要的视觉方向，可以直接在提示词里写中文风格名：

```text
用点阵编辑风，做一份中文技术分析 PPT。
用咨询报告风格，做一份 AI Agent 行业研究。
用故事集风格，做一份图片叙事型项目复盘。
```

可选演示模板包括：Y2K 手册、镭射网格、作品集、极客风格、黑底闪光、点阵编辑风、简约测评、杂志风、咨询报告、日光、雨天手记、故事集。

小红书长文模板包括：雨天手记、杂志风、极客风格、终端风、点阵浅色、简约测评、黑底闪光、故事集、镭射网格、日光、咨询报告。

小红书封面模板包括：简约测评、杂志风、点阵编辑风、咨询报告、雨天手记、黑底闪光、日光、极客风格、终端风、故事集、镭射网格。

如果要在脚本里精确指定模板，再查看对应 skill 的 `assets/catalog.json` 里的模板 ID。

## 本地脚本

在对应 skill 目录中运行：

```bash
# 横向 HTML 演示
cd skills/lieflat-html-deck
node scripts/list-templates.mjs
node scripts/audit-languages.mjs
node scripts/capture-template-previews.mjs --lang zh --out ../../previews/zh
node scripts/capture-template-previews.mjs --lang en --out ../../previews/en
node scripts/create-design.mjs --template editorial --lang zh --out output/editorial-demo.html
node scripts/audit-assets.mjs output/editorial-demo.html
node scripts/capture-screenshots.mjs --url http://localhost:8765/output/editorial-demo.html --count 8 --out screenshots

# 小红书长文
cd ../lieflat-xhs-longform
node scripts/create-design.mjs --template xhs-sunrise --lang zh --out output/xhs-demo.html
node scripts/capture-xhs-card.mjs --html output/xhs-demo.html --out output/xhs-demo-card.png

# 小红书封面
cd ../lieflat-xhs-cover
node scripts/create-design.mjs --template xhs-cover-dot-matrix --lang zh --out output/xhs-cover-demo.html
node scripts/capture-xhs-card.mjs --html output/xhs-cover-demo.html --out output/xhs-cover-demo.png
```

如果要强制要求 `lieflat-html-deck` 中每个演示模板都有 `en` 和 `zh` 两个版本，运行：

```bash
node scripts/audit-languages.mjs --strict-bilingual
```

也可以在仓库根目录直接运行：

```bash
npm run list
npm run audit:languages
npm run preview:capture
npm run preview:capture:longform
npm run preview:capture:cover
```

## 许可证

MIT。

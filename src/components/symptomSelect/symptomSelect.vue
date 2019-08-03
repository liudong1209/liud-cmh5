<template>
	<div class="symptomSelect" v-if="list">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">症状选取</span>
		</header>
		<div class="swipe">
			<md-swiper :autoplay="0" :is-prevent="false">
				<md-swiper-item>
					<div class="content">
						<ul class="tab-tilte">
							<li v-for="(item,index) in tabs" :key="index" :class="{active:index == tabNum}" @click="tab(index)">
								{{item}}
							</li>
						</ul>
						<div class="tab-content">
							<div class="ositive" v-show="tabNum == 0">
								<div class="img">
									<div class="man" v-show="manFlag">
										<div class="manFront" v-show="manFrontFlag">
											<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
												<g>
													<image x="10" y="0" width="360" height="360" xlink:href="static/images/man_front.png" />
													<path @click="showHeader()" class="fillnoColor" id="head" name="头部" d="M188 0L181 2L178 5L175 10L172 14C172 16 172 20 172 20C173 22 173 25 173 25C171 25 170 28 170 28L170 30L170 34L172 38C174 40 175 42 175 42L176 46C178 48 182 50 182 50C186 52 193 52 193 52L198 49L200 44L204 40L208 32L208 27C206 25 204 27 204 27L205 22L204 14L202 8L198 4L194 1C194 1 188 -1 188 0Z" />
													<path @click="showSym($event)" name="肩部" firstName="颈肩部" secondName="肩部" class="fillnoColor shoulder" id="rightShoulder"
													 d="M136 64L138 84L144 86L149 86C150 85 160 62 160 62L152 60L144 62L136 64Z" />
													<path @click="showSym($event)" name="肩部" firstName="颈肩部" secondName="肩部" class="fillnoColor shoulder" id="leftShoulder"
													 d="M220 62L219 71L224 78L229 84L236 85L246 67L242 62L234 60L225 60L220 62Z" />
													<path @click="showSym($event)" name="上肢" firstName="上肢部" secondName="上肢" class="fillnoColor upperLimb" id="rightUpperLimb"
													 d="M160 62L146 61L132 64L124 64L116 64L104 63L96 62L88 63L80 66L70 68L59 69L50 70L39 71L30 72C26 72 24 73 24 73C20 75 18 77 18 77L12 80L10 83C14 85 14 86 14 86C18 86 20 86 20 86C24 86 26 87 26 87C28 87 34 86 34 86L38 84L44 83L48 78L56 78L64 78C68 78 74 79 74 79L82 80L90 80L100 81L106 81L114 81L122 82C125 82 130 83 130 83L134 84L142 84L150 85L160 62Z" />
													<path @click="showSym($event)" name="上肢" firstName="上肢部" secondName="上肢" class="fillnoColor upperLimb" id="leftUpperLimb"
													 d="M220 62L224 74L226 80L232 85L238 86L246 85L256 80L266 79L276 81L288 80L302 78L314 77L324 77L336 80C336 82 340 82 340 82L342 84L348 86L354 87C358 85 358 82 358 82L360 84C362 86 366 86 366 86C368 86 370 84 370 84L366 81L360 76L354 72L336 71L328 70L316 69L305 66L288 64L278 63L269 65L258 65L254 65C250 66 246 64 246 64C244 62 238 62 238 62L229 60L224 60L220 62Z" />
													<path @click="showSym($event)" name="肘关节" firstName="上肢部" secondName="肘关节" class="fillnoColor elbow" id="rightElbow"
													 d="M88 64L90 71L92 78C92 80 96 81 96 81L102 81L106 81L109 72L110 66C110 64 106 63 106 63L100 62L88 64Z" />
													<path @click="showSym($event)" name="肘关节" firstName="上肢部" secondName="肘关节" class="fillnoColor elbow" id="leftElbow"
													 d="M269 64L270 79C274 81 278 82 278 82L284 82L287 76L288 65L283 62L276 62L269 64Z" />
													<path @click="showSym($event)" name="手" firstName="上肢部" secondName="手" class="fillnoColor hand" id="rightHand"
													 d="M46 70L49 77L46 82L42 84L28 88L24 86L26 80L19 86L14 86L10 84L17 76L27 70L46 70Z" />
													<path @click="showSym($event)" name="手" firstName="上肢部" secondName="手" class="fillnoColor hand" id="leftHand"
													 d="M338 72L332 79L340 85C344 86 348 86 348 86L354 88C356 86 358 84 358 84L356 80L362 86C366 86 369 85 369 85L369 82L364 79C362 77 357 74 357 74L352 71L338 72Z" />
													<path @click="showSym($event)" name="腕关节" firstName="上肢部" secondName="腕关节" class="fillnoColor hand" id="rightHand"
													 d="M45 70L49 78L56 78L56 70L45 70Z" />
													<path @click="showSym($event)" name="腕关节" firstName="上肢部" secondName="腕关节" class="fillnoColor hand" id="leftHand"
													 d="M333 80L339 72L330 70L326 78L333 80Z" />
													<path @click="showSym($event)" name="胸部" firstName="胸部" class="fillnoColor chest" id="chest" d="M162 68L152 83L152 90L156 100L160 104L166 106L175 107L184 106L190 105L199 106L214 107L222 103L224 95L226 86L214 74L207 68L189 70L184 73C184 73 162 69 162 68Z" />
													<path @click="showAbdomen()" name="腹部" class="fillnoColor abdomen" id="abdomen" d="M160 108L174 107L202 108L220 110L216 127L218 148L202 172L184 172L161 152L164 128L160 108Z" />
													<path @click="showSym($event)" name="髋关节" firstName="下肢部" secondName="髋关节" class="fillnoColor" d="M162 150L178 167L173 178L158 180L162 150Z" />
													<path @click="showSym($event)" name="髋关节" firstName="下肢部" secondName="髋关节" class="fillnoColor" d="M218 150L204 165L208 179L223 180L222 160L218 150Z" />
													<path @click="showSym($event)" name="前阴" firstName="会阴部" secondName="前阴" class="fillnoColor anteriorYin"
													 id="anteriorYin" d="M176 182L180 182L186 181L194 182L198 184L202 186L203 190L200 194L194 198L190 200L186 200L182 196L174 192L176 182Z" />
													<path @click="showSym($event)" name="下肢" firstName="下肢部" secondName="下肢" class="fillnoColor lowerLimb" id="rightLowerLimb"
													 d="M158 186L154 206L154 226L157 242L158 258L156 276L156 288L156 299L158 314L158 322L158 330L154 336L150 340L146 344L138 347L134 352L134 356C135 357 138 358 138 358L144 356L150 356L154 354L158 350L164 350L172 350L176 343L173 332L172 322L174 312L176 300L178 286L174 270L178 264L180 253L182 232L188 210L188 204L158 186Z" />
													<path @click="showSym($event)" name="下肢" firstName="下肢部" secondName="下肢" class="fillnoColor lowerLimb" id="leftLowerLimb"
													 d="M192 204L208 194L220 186L224 184L224 190L226 198L226 208L226 214L224 221L222 230L222 235L220 242L220 248L218 254L218 260L218 266L220 276L219 286L219 288L218 292L216 298L216 304L214 311L212 324L212 328L212 334L216 340L220 344L223 346L225 348L228 351L230 356L228 358L218 358C214 356 211 352 211 352L206 349L202 349L198 346C197 344 200 324 200 324L201 308L198 290L200 266L198 256L198 248L195 224L192 204Z" />
													<path @click="showSym($event)" name="膝关节" firstName="下肢部" secondName="膝关节" class="fillnoColor kneeJoint"
													 id="rightKneeJoint" d="M156 240L164 238L172 236L179 237L180 242L180 248L178 254L178 260L176 265L175 269L176 274L170 278L163 276L156 274L158 258L156 240Z" />
													<path @click="showSym($event)" name="膝关节" firstName="下肢部" secondName="膝关节" class="fillnoColor kneeJoint"
													 id="leftKneeJoint" d="M197 242L205 240L214 239C218 241 218 244 218 244L217 250L217 254L218 258L218 262L218 269L218 274L216 278L211 280L204 278L200 275L200 265L198 256L197 242Z" />
													<path @click="showSym($event)" name="足" firstName="下肢部" secondName="足" class="fillnoColor foot" id="rightFoot"
													 d="M160 326L158 334L152 339L144 344L141 346C138 346 136 349 136 349L132 352L132 355C133 356 138 358 138 358C141 358 144 356 144 356C148 356 150 355 150 355L152 352C154 352 160 348 160 348L166 350L172 348L174 346L174 340L173 332L173 329L160 326Z" />
													<path @click="showSym($event)" name="足" firstName="下肢部" secondName="足" class="fillnoColor foot" id="leftFoot"
													 d="M212 327L211 334L212 338L217 344L222 346C225 348 227 350 227 350L230 353L232 358L228 358L224 358L220 357L214 356L211 354L208 350L202 350L200 348L196 344L198 336L199 330L212 327Z" />
													<path @click="showSym($event)" name="踝关节" firstName="下肢部" secondName="踝关节" class="fillnoColor" d="M159 327L157 335L166 343L174 342L171 322L158 319L159 327Z" />
													<path @click="showSym($event)" name="踝关节" firstName="下肢部" secondName="踝关节" class="fillnoColor" d="M200 325L213 323L211 336L204 340L200 337C200 337 201 326 200 325Z" />

												</g>
											</svg>
										</div>
										<div class="manHeader" v-show="manHeaderFalg">
											<span class="backFront" @click="backFront()">返回正面</span>
											<svg width="360" height="320" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
												<g>
													<image x="65" y="0" width="240" height="326" xlink:href="static/images/man_header.png" />
													<path @click="showSym($event)" name="耳" firstName="头面部" secondName="耳" d="M117 121L111 113C108 114 104 131 104 131L107 148L109 156L115 174C123 173 125 172 125 172L120 131L117 121Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="耳" firstName="头面部" secondName="耳" d="M257 119L251 172C259 174 270 157 270 157L273 134L272 122L271 117L265 112L257 119Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="眼" firstName="头面部" secondName="眼" d="M124 123L150 135L164 132L175 125L168 109L156 103L146 104L133 110L124 123Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="眼" firstName="头面部" secondName="眼" d="M195 122L216 135L242 126L233 107L219 104L201 108L195 122Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="鼻" firstName="头面部" secondName="鼻" d="M176 124L166 158L167 166C171 169 185 170 185 170L195 170L201 163L193 126L176 124Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="面颊" firstName="头面部" secondName="面颊" d="M125 132L153 140L168 136L163 167L149 178L125 180L125 132Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="面颊" firstName="头面部" secondName="面颊" d="M200 136L219 139L246 129L247 170L224 184L213 182L207 176L200 136Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="头部" firstName="头面部" secondName="头部" d="M120 45L115 70L116 76L129 81L155 89L175 89L192 88L216 85L231 87L251 86L261 78L259 54L250 34L236 20L217 7L200 1L177 0L155 6L138 21L131 28L120 45Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="口" firstName="头面部" secondName="口" d="M156 192L171 200L193 201L211 193L190 182C182 183 177 181 177 181L156 192Z"
													 class="fillnoColor" />

													<path @click="showSym($event)" name="颈部" firstName="颈肩部" secondName="颈部" d="M135 210L132 238L164 306L191 321L213 308L249 236L247 208L215 233L186 243L159 236L135 210Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="咽喉" firstName="头面部" secondName="咽喉" d="M157 228L163 271L174 301L187 310L197 300L209 273L218 229L188 238L171 234L157 228Z"
													 class="fillnoColor" />
												</g>
											</svg>

										</div>
										<div class="abdomen" v-show="manAbdomenFlag">
											<span class="backFront" @click="backFront()">返回正面</span>
											<svg width="360" height="320" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
												<g>
													<image x="65" y="0" width="240" height="321" xlink:href="static/images/man_belly.png" />
													<path @click="showSym($event)" name="上腹部" firstName="腹部" secondName="上腹部" d="M140 10L122 57L125 86L135 98L156 103L177 103L206 103L230 97L239 87L237 53L225 22L213 9L140 10Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="中腹部" firstName="腹部" secondName="中腹部" d="M129 100L132 136L142 161L168 167L190 167L207 165L226 150L232 135L231 104L232 96L129 100Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="下腹部" firstName="腹部" secondName="下腹部" d="M126 164L128 193L133 217L162 227L175 228L194 226L210 225L217 219L223 212L227 193L229 177L233 163L126 164Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="右上腹" firstName="腹部" secondName="右上腹" d="M80 2L94 69L122 75L124 24L139 11L80 2Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="右侧腹" firstName="腹部" secondName="右侧腹" d="M95 71L132 85L145 155L138 163L113 155L100 146L90 130L91 108L95 71Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="右下腹" firstName="腹部" secondName="右下腹" d="M90 133L82 183L81 201L134 229L137 189L137 167C137 167 91 136 90 133Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="左上腹" firstName="腹部" secondName="左上腹" d="M285 3L271 71L230 98L238 31L219 7L285 3Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="左侧腹" firstName="腹部" secondName="左侧腹" d="M233 83L223 161L277 136L279 120L271 73L233 83Z"
													 class="fillnoColor" />
													<path @click="showSym($event)" name="左下腹" firstName="腹部" secondName="左下腹" d="M276 136L290 181L291 205L222 223L203 201L210 181L276 136Z"
													 class="fillnoColor" />
												</g>
											</svg>
										</div>
									</div>
									<div class="woman" v-show="womanFlag">
										<div class="womanFront">
											<div class="womanFront" v-show="womanFrontFlag">
												<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g>
														<image x="10" y="0" width="350" height="359" xlink:href="static/images/woman_front.png" />
														<path @click="showWomanHeader()" name="头部" d="M172 3L167 9L164 16L164 26L165 30L168 36L172 42L179 50L184 52L190 48L196 41L200 35L204 30L203 14L198 4L185 0L172 3Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="胸部" firstName="胸部" d="M162 75L158 89L160 104L165 107L172 107L182 103L185 100L188 103L189 106L196 108L204 108L208 104L210 97L212 92L203 75L162 75Z"
														 class="fillnoColor" />
														<path @click="showWomanAbdomen()" name="腹部" d="M160 108L208 108L204 128L212 149L190 163L177 163L158 147L163 128L160 108Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="前阴" firstName="会阴部" secondName="前阴" d="M166 172L178 186L188 187L199 174L184 170L166 172Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肩部" firstName="颈肩部" secondName="肩部" d="M164 61L158 86L144 80L139 63L148 59L164 61Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肩部" firstName="颈肩部" secondName="肩部" d="M209 60L218 82L226 80L231 62L218 59L209 60Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="上肢" firstName="上肢部" secondName="上肢" d="M159 61L152 83L125 80L106 81L92 83L46 80L40 84L32 86C28 86 25 86 25 86L26 83C22 82 19 82 19 82L14 82L10 80C10 78 14 76 14 76L26 74L52 72L68 71L84 66L98 68L113 68L132 63L150 60L159 61Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="上肢" firstName="上肢部" secondName="上肢" d="M218 81L231 81L240 80L254 82L264 82L274 83L280 84L289 84L302 82L314 82L322 81L326 84L332 86L337 86L344 87L342 83L348 82C352 84 354 84 354 84C356 83 360 82 360 82L358 79L354 76L333 74L318 72L292 70L275 68L262 68L249 66L233 63L223 60L214 60C214 60 218 82 218 81Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肘关节" firstName="上肢部" secondName="肘关节" d="M83 68L84 83L92 83L98 82L102 69L94 68C94 68 83 69 83 68Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肘关节" firstName="上肢部" secondName="肘关节" d="M266 69L266 82L274 84L280 84L282 68L271 68L266 69Z"
														 class="fillnoColor" />

														<path @click="showSym($event)" name="手" firstName="上肢部" secondName="手" d="M48 79L41 82L34 84C30 86 24 86 24 86C25 84 26 82 26 82L21 83C19 82 13 82 13 82L10 79C11 77 14 76 14 76L25 74L34 74L44 73C47 74 48 79 48 79Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="手" firstName="上肢部" secondName="手" d="M320 75L318 82L325 81L329 84L334 86L339 87C342 88 342 84 342 84L338 81L349 84C352 82 358 82 358 82L360 80L356 78L341 74L320 75Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="腕关节" firstName="上肢部" secondName="腕关节" class="fillnoColor" d="M318 74L318 82L325 82L326 74L318 74Z" />
														<path @click="showSym($event)" name="腕关节" firstName="上肢部" secondName="腕关节" class="fillnoColor" d="M42 74L44 81L49 80L50 72L42 74Z" />
														<path @click="showSym($event)" name="下肢" firstName="下肢部" secondName="下肢" d="M150 171L180 193L179 222L178 250L174 261L176 276L175 290L173 311L175 338L175 356L169 358L163 359L157 359L155 356L162 336L161 318L157 295L156 282L156 274L156 257L156 241L148 200L150 171Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="下肢" firstName="下肢部" secondName="下肢" d="M188 189L189 206L191 230L191 246L194 261L195 289L196 308L197 321L196 335L195 346L194 355L199 358L206 357L214 357L214 346L210 334L208 326L210 300L214 284L216 266L213 251L217 217L220 193L218 172L188 189Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="膝关节" firstName="下肢部" secondName="膝关节" d="M155 232L178 230L179 245L176 257L176 260L155 262L156 249L155 232Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="膝关节" firstName="下肢部" secondName="膝关节" d="M191 234L214 233L213 249L214 261L194 262L192 249C192 249 191 233 191 234Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="髋关节" firstName="下肢部" secondName="髋关节" class="fillnoColor" d="M156 148L151 171L168 175L172 163L156 148Z" />
														<path @click="showSym($event)" name="髋关节" firstName="下肢部" secondName="髋关节" class="fillnoColor" d="M212 148L198 164L200 176L218 170L215 157L212 148Z" />
														<path @click="showSym($event)" name="足" firstName="下肢部" secondName="足" d="M162 322L162 330L160 340L155 352L158 358L164 358C168 358 173 358 173 358L176 355L175 344L176 340L173 327L162 322Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="足" firstName="下肢部" secondName="足" d="M196 326L195 341L193 354L194 357L199 358L208 358L214 356L214 350L208 336L208 324L196 326Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="踝关节" firstName="下肢部" secondName="踝关节" class="fillnoColor" d="M162 312L163 322L162 330L174 327L174 311L162 312Z" />
														<path @click="showSym($event)" name="踝关节" firstName="下肢部" secondName="踝关节" class="fillnoColor" d="M196 312L208 312L208 322L210 326L209 329L196 328L196 312Z" />
													</g>
												</svg>

											</div>
											<div class="womanHeader" v-show="womanHeaderFalg">
												<span class="backFront" @click="backwomanFront()">返回正面</span>
												<svg width="360" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g>
														<image x="80" y="0" width="210" height="340" xlink:href="static/images/woman_header.png" />
														<path @click="showSym($event)" name="头部" firstName="头面部" secondName="头部" d="M125 14L94 49L80 84L92 106L120 111L141 109L169 113L200 113L228 110L259 107L272 101L281 83L275 57L258 35L241 14L216 1L179 -2L147 1L125 14Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="眼" firstName="头面部" secondName="眼" d="M118 154L129 166L140 168L153 168L160 163L166 155L165 142C158 140 150 138 150 138L138 137C130 141 123 145 123 145L118 154Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="眼" firstName="头面部" secondName="眼" d="M190 151L195 161L205 162L215 163L226 161L234 154L240 141L231 137L218 137L204 135L195 137C195 137 190 153 190 151Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="耳" firstName="头面部" secondName="耳" d="M256 153L252 179L250 192C257 195 266 191 266 191L268 178L270 161L269 149L256 153Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="耳" firstName="头面部" secondName="耳" d="M96 144L98 169L106 188L112 194L111 142L96 144Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="鼻" firstName="头面部" secondName="鼻" d="M172 151L161 200L165 206L180 209L196 203L196 197L186 151L172 151Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="口" firstName="头面部" secondName="口" d="M150 226L165 238L180 239L192 238L204 231L209 226L197 221L180 221L170 221L150 226Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="面颊" firstName="头面部" secondName="面颊" d="M114 173L120 216L157 211L161 169L120 166L114 173Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="面颊" firstName="头面部" secondName="面颊" d="M202 169L202 169L241 170L240 216L202 207"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="颈部" firstName="颈肩部" secondName="颈部" d="M128 240L134 287L120 309L115 321L140 330L166 335L188 336L213 331L235 323L245 307L231 279L233 239L198 262L176 265L148 258L128 240Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="咽喉" firstName="头面部" secondName="咽喉" d="M170 267L160 300L172 329L183 332L194 328L203 298L188 266L170 267Z"
														 class="fillnoColor" />

													</g>
												</svg>

											</div>
											<div class="womanabdomen" v-show="womanAbdomenFlag">
												<span class="backFront" @click="backwomanFront()">返回正面</span>
												<svg width="360" height="320" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g>
														<image x="80" y="60" width="200" height="248" xlink:href="static/images/woman_belly.png" />
														<path @click="showSym($event)" name="上腹部" firstName="腹部" secondName="上腹部" d="M155 67L132 93L142 126L166 131L188 129L203 127L215 101L210 81L190 62C190 62 155 68 155 67Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="中腹部" firstName="腹部" secondName="中腹部" d="M135 128L220 129L227 181L195 200L136 197L125 172C125 172 136 129 135 128Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="下腹部" firstName="腹部" secondName="下腹部" d="M128 187L226 187L238 227L217 242L152 244L122 244L117 207C117 207 129 188 128 187Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="右下腹" firstName="腹部" secondName="右下腹" d="M98 173L130 187L152 246L81 217L98 173Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="右上腹" firstName="腹部" secondName="右上腹" d="M112 117L146 117L138 82L162 63L103 61C103 61 112 118 112 117Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="右侧腹" firstName="腹部" secondName="右侧腹" d="M113 116L148 112L140 167L100 167L110 135C110 135 113 115 113 116Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="左下腹" firstName="腹部" secondName="左下腹" d="M255 169L215 189L206 244L272 219L255 169Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="左侧腹" firstName="腹部" secondName="左侧腹" d="M252 164L211 176L212 121L247 109L243 128C243 128 252 166 252 164Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="左上腹" firstName="腹部" secondName="左上腹" d="M245 112L203 127L213 84L192 63L252 62L245 112Z"
														 class="fillnoColor" />
													</g>
												</svg>
											</div>
										</div>
									</div>
									<div class="child" v-show="childrenFlag">
										<div class="childFront">
											<div class="childFront" v-show="childrenFrontFlag">
												<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g>
														<image x="10" y="0" width="350" height="350" xlink:href="static/images/childre_front.png" />
														<path @click="showChildrenHeader()" name="头部" d="M182 12L175 14L169 18L164 23L164 26L164 28L163 32L164 36L164 41C160 42 160 44 160 44L160 46L162 51L165 56L166 62L170 66L173 69L181 72C185 72 190 70 190 70L193 66L198 62L201 57C204 56 208 50 208 50L210 44L206 42C203 44 205 34 205 34L202 26L197 17L190 14L182 12Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肩部" firstName="颈肩部" secondName="肩部" d="M132 80L132 96L146 100L156 77L142 76L132 80Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肩部" firstName="颈肩部" secondName="肩部" d="M213 80L224 77L238 80L236 96L220 100L213 80Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="手" firstName="上肢部" secondName="手" d="M55 85L42 85L33 86L24 90L14 92L11 96L10 98C14 100 16 100 16 100L28 96L36 95C40 97 37 100 37 100L35 103L36 106C38 106 51 96 51 96L54 92L55 85Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="手" firstName="上肢部" secondName="手" d="M316 84L314 92L318 96L322 97L324 100C326 102 328 103 328 103C330 104 333 106 333 106L334 102L331 96C333 94 338 94 338 94C342 96 344 96 344 96C347 98 350 100 350 100C354 100 357 98 357 98C360 100 358 94 358 94L349 90L338 86L325 84L316 84Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="上肢" firstName="上肢部" secondName="上肢" d="M150 79L144 100L136 96L128 98L119 98L112 98L103 98L96 100L84 97L70 96L57 93C54 92 52 94 52 94L47 98L42 102L38 106L34 103L38 98L41 96L36 94L30 96L24 98L20 100C16 100 13 100 13 100C11 100 12 96 12 96L16 93L22 90L28 88L34 86L42 84L52 83L63 84L70 84L80 84L87 84L98 82L106 82L116 82L123 81L133 78L140 76L150 79Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="上肢" firstName="上肢部" secondName="上肢" d="M224 78L228 98L235 94L242 96L254 98L260 98L266 98C268 98 272 98 272 98L278 98L288 96L307 94L314 92C317 94 320 96 320 96C322 98 326 100 326 100L330 104C334 105 333 100 333 100L330 96C333 94 341 94 341 94L345 97C348 98 351 100 351 100L356 98L361 98L352 92L345 89L336 85L320 83L303 82L295 82L276 82L264 83L249 82L236 80L233 77L224 78Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肘关节" firstName="上肢部" secondName="肘关节" d="M85 82L84 98L93 100L104 98L107 84L97 82C97 82 85 83 85 82Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="肘关节" firstName="上肢部" secondName="肘关节" d="M260 82L264 98L271 98L282 97L282 82L272 80L260 82Z"
														 class="fillnoColor" />

														<path @click="showSym($event)" name="腕关节" firstName="上肢部" secondName="腕关节" class="fillnoColor" d="M49 84L52 94L59 94L60 83L49 84Z" />
														<path @click="showSym($event)" name="腕关节" firstName="上肢部" secondName="腕关节" class="fillnoColor" d="M317 94L322 84L310 84L307 93L317 94Z" />

														<path @click="showSym($event)" name="胸部" firstName="胸部" d="M165 96L153 107L160 130L179 135L189 135L210 128L212 110L196 96L165 96Z"
														 class="fillnoColor" />
														<path @click="showChildrenAbdomen()" name="腹部" d="M158 132L160 162L173 184L192 184L212 164L210 148L210 133L158 132Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="前阴" firstName="会阴部" secondName="前阴" d="M167 192L180 210L190 210L200 194L167 192Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="下肢" firstName="下肢部" secondName="下肢" d="M152 204L180 214L174 240L168 262L165 277L162 286L158 306L156 316L158 325L158 330L159 335L159 339L158 344L155 348C152 348 150 348 150 348C146 346 144 346 144 346L142 342L142 337L146 318L144 285L147 266C147 264 150 244 150 244L152 204Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="下肢" firstName="下肢部" secondName="下肢" d="M191 213L220 204L222 220L223 232L223 246L226 256L228 262L231 282L230 302L230 307L229 316L229 324L233 335L235 340L234 344C233 344 230 346 230 346L228 349C225 349 224 348 224 348C221 349 217 346 217 346L215 340L218 330L218 318L215 298L208 276L206 264L202 258L191 213Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="膝关节" firstName="下肢部" secondName="膝关节" d="M150 242L175 246L172 255L168 264L166 269L144 268L148 254L150 242Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="膝关节" firstName="下肢部" secondName="膝关节" d="M200 250L224 244L225 256L228 266L208 274L204 262L200 250Z"
														 class="fillnoColor" />

														<path @click="showSym($event)" name="髋关节" firstName="下肢部" secondName="髋关节" class="fillnoColor" d="M158 168L170 181L168 199L152 202L152 182L158 168Z" />
														<path @click="showSym($event)" name="髋关节" firstName="下肢部" secondName="髋关节" class="fillnoColor" d="M158 168L170 181L168 199L152 202L152 182L158 168ZM213 168L198 182L200 198L220 200L218 180L213 168Z" />
														<path @click="showSym($event)" name="足" firstName="下肢部" secondName="足" d="M146 314L156 314L158 320L158 326L158 332L160 341L158 346L155 348C152 348 148 348 148 348L144 346L140 342L140 335L145 329L146 323L146 314Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="足" firstName="下肢部" secondName="足" d="M218 312L229 313L230 325L230 328L232 332L234 338L234 346C230 348 227 348 227 348C225 350 221 348 221 348C217 347 216 342 216 342C215 340 218 332 218 332L217 320L218 312Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="踝关节" firstName="下肢部" secondName="踝关节" class="fillnoColor" d="M157 308L158 318L157 322L145 320L145 309L157 308Z" />
														<path @click="showSym($event)" name="踝关节" firstName="下肢部" secondName="踝关节" class="fillnoColor" d="M218 310L218 315L218 324L230 322L230 309L218 310Z" />

													</g>
												</svg>
											</div>
											<div class="childHeader" v-show="childrenHeaderFlag">
												<span class="backFront" @click="backChildrenFront()">返回正面</span>
												<svg width="360" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g>
														<image x="80" y="0" width="210" height="332" xlink:href="static/images/children_header.png" />
														<path @click="showSym($event)" name="头部" firstName="头面部" d="M173 2L148 7L138 12L124 22L110 36L103 50L98 76L98 88L128 88L163 86L196 86L230 91L252 92L270 98L272 82L264 52L249 26L223 12C223 12 212 0 210 0C208 0 172 4 173 2Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="耳" firstName="头面部" secondName="耳" d="M99 129L92 117L81 120L80 128L80 138L82 148L84 160L88 169L98 182L99 129Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="耳" firstName="头面部" secondName="耳" d="M263 136L265 124L275 120L290 124L290 136L290 146L289 158C286 162 282 170 282 170L272 180L258 184L263 136Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="眼" firstName="头面部" secondName="眼" d="M110 130L133 124L146 127L149 132L155 138L150 146L138 148C130 148 119 144 119 144C119 144 110 132 110 130Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="眼" firstName="头面部" secondName="眼" d="M185 132L203 124L217 129L224 140C228 144 208 148 208 148L190 148L185 142L185 132Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="鼻" firstName="头面部" secondName="鼻" d="M157 142L145 177L152 185L162 186C167 186 176 186 176 186C184 185 188 174 188 174L177 145L157 142Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="面颊" firstName="头面部" secondName="面颊" d="M100 150L145 153L141 187L138 199L110 210L101 185L100 150Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="面颊" firstName="头面部" secondName="面颊" d="M191 153L257 151L251 189L236 211L190 193L191 153Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="口" firstName="头面部" secondName="口" d="M141 205L161 200L173 200L194 206L175 220L162 219L144 211L141 205Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="颈部" firstName="颈肩部" secondName="颈部" d="M129 238L130 263L125 270L152 304L205 312L225 300L246 263L233 251L234 228L187 250L158 252L144 245L129 238Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="咽喉" firstName="头面部" secondName="咽喉" d="M156 256L151 278L162 311L173 322L184 322L194 304L200 274L198 257L156 256Z"
														 class="fillnoColor" />

													</g>
												</svg>
											</div>
											<div class="childabdomen" v-show="childrenAbdomenFlag">
												<span class="backFront" @click="backChildrenFront()">返回正面</span>
												<svg width="360" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g>
														<image x="80" y="60" width="200" height="247" xlink:href="static/images/children_belly.png" />
														<path @click="showSym($event)" name="上腹部" firstName="腹部" secondName="上腹部" d="M156 69L133 95L133 120L148 138L208 141L216 123L222 91L193 71L156 69Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="中腹部" firstName="腹部" secondName="中腹部" d="M142 133L221 132L227 214L126 213C126 213 142 135 142 133Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="下腹部" firstName="腹部" secondName="下腹部" d="M116 213L238 213L238 255L201 269L136 268L116 255C116 255 116 215 116 213Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="左侧腹" firstName="腹部" secondName="左侧腹" d="M220 125L252 113L253 150L265 180L208 205L220 125Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="左上腹" firstName="腹部" secondName="左上腹" d="M222 129L250 115L257 73L186 72L218 91L222 129Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="左下腹" firstName="腹部" secondName="左下腹" d="M205 220L264 183L276 208L278 232L204 266L205 220Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="右上腹" firstName="腹部" secondName="右上腹" d="M97 74L100 122L138 137L130 91L162 77L97 74Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="右侧腹" firstName="腹部" secondName="右侧腹" d="M100 129L140 138L134 213L86 190L96 167L100 129Z"
														 class="fillnoColor" />
														<path @click="showSym($event)" name="右下腹" firstName="腹部" secondName="右下腹" d="M87 193L144 217L145 269L78 242L77 207L87 193Z"
														 class="fillnoColor" />
													</g>
												</svg>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!--侧面-->
							<div class="side" v-show="tabNum == 1">
								<div class="man" v-show="manFlag">
									<div class="img">
										<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g>
												<image x="10" y="0" width="360" height="360" xlink:href="static/images/man_side.png" />
												<path @click="showSym($event)" name="胁" firstName="胁" d="M192 83L183 94L190 131L197 131L205 95L199 85L192 83Z"
												 class="fillnoColor" />
											</g>
										</svg>
									</div>
								</div>
								<div class="woman" v-show="womanFlag">
									<div class="img">
										<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g>
												<image x="10" y="0" width="350" height="359" xlink:href="static/images/woman_side.png" />
												<path @click="showSym($event)" name="胁" firstName="胁" d="M183 83L176 109L178 125L183 133L187 137L191 117L193 101L194 87L191 82L183 83Z"
												 class="fillnoColor" />
											</g>
										</svg>
									</div>
								</div>
								<div class="children" v-show="childrenFlag">
									<div class="img">
										<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g>
												<image x="10" y="0" width="350" height="350" xlink:href="static/images/children_side.png" />
												<path @click="showSym($event)" name="胁" firstName="胁" d="M173 99L172 130L174 162L186 165L192 139L191 112L191 97L173 99Z"
												 class="fillnoColor" />
											</g>
										</svg>
									</div>
								</div>
							</div>
							<!--背面-->
							<div class="back" v-show="tabNum == 2">
								<div class="man" v-show="manFlag">
									<div class="img">
										<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g>
												<image x="10" y="0" width="360" height="360" xlink:href="static/images/man_back.png" />
												<path @click="showSym($event)" name="背部" firstName="背部" d="M157 65L150 92L163 120L219 119L231 91L226 64L191 63C191 63 157 66 157 65Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="腰部" firstName="腰部" d="M163 119L221 119L217 133L219 155L219 159L188 157L172 158L161 158L164 137L163 119Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="项部" firstName="项部" d="M179 53L173 59L191 68L208 58L203 53L205 40L177 41L179 53Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="后阴" firstName="会阴部" secondName="后阴" d="M173 181L172 194L171 201L182 201L188 201L195 202C197 202 201 203 201 203L201 193L206 182L192 178L181 178C181 178 174 181 173 181Z"
												 class="fillnoColor" />
											</g>
										</svg>
									</div>
								</div>
								<div class="woman" v-show="womanFlag">
									<div class="img">
										<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g>
												<image x="10" y="0" width="350" height="359" xlink:href="static/images/woman_back.png" />
												<path @click="showSym($event)" name="背部" firstName="背部" d="M165 63L159 101L162 118L204 118L209 91L209 63L165 63Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="腰部" firstName="腰部" d="M161 119L205 119L205 127L212 147L156 145L160 131L161 119Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="项部" firstName="项部" d="M177 56L169 61L179 70L194 71L205 63L199 57L195 47L177 48C177 48 178 57 177 56Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="后阴" firstName="会阴部" secondName="后阴" d="M169 176L177 190L191 190L203 178L187 173L169 176Z"
												 class="fillnoColor" />
											</g>
										</svg>
									</div>
								</div>
								<div class="children" v-show="childrenFlag">
									<div class="img">
										<svg width="370" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g>
												<image x="10" y="0" width="350" height="350" xlink:href="static/images/children_back.png" />
												<path @click="showSym($event)" name="背部" firstName="背部" d="M160 77L157 104L159 133L211 135L213 107L210 75L160 77Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="腰部" firstName="腰部" d="M159 133L209 134L210 156L212 163L185 169L156 166L159 155C159 155 160 133 159 133Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="项部" firstName="项部" d="M168 76L183 81L200 75L195 68L195 60L173 60L173 68C173 68 168 77 168 76Z"
												 class="fillnoColor" />
												<path @click="showSym($event)" name="后阴" firstName="会阴部" secondName="后阴" d="M173 198L181 209L189 210L197 197L196 191L174 190L173 198Z"
												 class="fillnoColor" />
											</g>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</md-swiper-item>
				<md-swiper-item>
					<div class="s-list">
						<div class="left">
							<ul class="left-ul">
								<li class="left-ul-li" v-for="(item,index) in symptomLeftList" :key="index" @click.stop="secondMenuShow(index)">
									<div class="title" :class="{'active':index == leftNum}">{{item.name}}</div>
									<ul class="second-menu" v-if="secondMenuFlag && index == leftNum">
										<li v-if="item.class1.length!=0" :class="{'active':index+'-'+ind == leftSecondNum}" v-for="(item,ind) in item.catname" :key="index+'-'+ind "
										 @click.stop="rightListShow(index+'-'+ind )">
											{{item.classNam}}
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="right">
							<div class="r-list">
								<div class="r-list-list" v-for="(item,index) in symptomLeftList" :key="index" v-show="leftSecondNum != -1">
									<div v-for="(item,ind) in item.catname" :key="ind" v-show="leftSecondNum == index+'-'+ind">
										<div v-for="(item,k) in item.class1" :key="k" v-if="item.class2">
											<div class="title">{{item.classNam}}</div>
											<ul class="symptom-ul">
												<li v-for="(item,ke) in item.class2" :id="item.sId">
													<div class="title">{{item.classNam}}</div>
													<ul class="symptom-ul symptom-ul-ul" v-if="!item.class3">
														<li @click="addSelectedSympom(item.sId,item.popname,item.termname)">
															{{item.popname}}
														</li>
													</ul>

													<ul class="symptom-ul symptom-ul-ul" v-else>
														<li v-for="(item,ke) in item.class3" @click="addSelectedSympom(item.sId,item.popname,item.termname)">
															{{item.popname}}
														</li>
													</ul>
												</li>
											</ul>
										</div>
										<ul class="symptom-ul symptom-ul-ul" v-if="!item.class2">

											<li v-for="(item,ke) in item.class1" :id="item.sId" @click="addSelectedSympom(item.sId,item.popname,item.termname)">
												{{item.popname}}
											</li>
										</ul>
									</div>
								</div>

							</div>
						</div>
					</div>
				</md-swiper-item>
			</md-swiper>
			<div class="selected">
				<span class="symptom">已选症状:</span>
				<ul>
					<li v-for="(item,index) in selectedPopnameList" :key='index' @click="delSelected(index)">
						<span class="text" :symptomId="item.symptomId">{{item.symptom}}</span>
						<span class="close">
							<img src="static/images/close_tag.png" />
						</span>
					</li>

				</ul>
			</div>
			<div class="next" @click="next()">下一步</div>
		</div>
		<!--定义一个弹出框-->
		<div class="dialog-modal" v-show="dialogModal"></div>
		<div class="dialog"  v-show="dialogFlag">
			<div class="dialog-box">
				<div class="title">
					<span class="tex">{{dialogTitle}}</span>
					<span class="mui-icon mui-icon-closeempty" @click="close()"></span>
				</div>
				<div class="content">
					<div class="left">
						<ul class="tab">
							<!--俩级部位-->
							<li v-for="(item,index) in symptomList" :class="{active:iscur==index}" :key="index" @click="tabSymptomChange(index)"
							 v-if="item.classNam && item.class1.length!=0">
								{{item.classNam}}
							</li>
							<!--一级部位-->
							<li v-for="(item,ind) in symptomList" :key="ind" v-if="!item.classNam">
								<ul>
									<li v-for="(item,index) in item.part2" :class="{active:iscur==index}" :key="index" @click="tabSymptomChange(index)">
										{{item.classNam}}
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="right">
						<!--俩级部位 三层-->
						<ul v-show="iscur == index" class="cont third" v-for="(item,index) in symptomList" :key="'third'+index">
							<li v-if="item.class2" v-for="(item,sId) in item.class1" :key="sId">
								<ul class="tab">
									<li v-if="item.class2.length!=0" :class="{active:isThirdCur==sId}" @click="tabSymptomThirdChange(sId,item)">
										{{item.classNam}}
										
									</li>
								</ul>
								<ul class="tab-con" v-show="isThirdCur == sId">
									<li v-for="(item,sIdIndex) in item.class2" :key="'sId'+sIdIndex" :symptomId="item.sId" :class="{active:isfourCur == item.sId}"
									 @click="addSelfActive(item,item.sId);addActive(sId);addSelectedSympom(item.sId,item.popname,item.termname)">
										{{item.popname}}
									</li>
								</ul>
							</li>
							<!--俩级部位 二层-->
							<ul v-if="!item.class2" v-show="iscur == index" class="cont" v-for="(item,index) in symptomList" :key="'s'+ index">
								<li :class="{active:rightSeletcd==sId}" @click="addActive(sId);addSelectedSympom(item.sId,item.popname,item.termname)"
								 :symptomId="item.sId" v-for="(item,sId) in item.class1" :key="'class1'+sId">{{item.popname}}</li>
							</ul>
						</ul>

					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mand-mobile'
	import {mapState,mapGetters,mapActions} from 'vuex';
	export default {
		data() {
			return {
				dialogModal:false,//总遮盖层
				patientInfo: null, //用户信息
				userId: this.$store.getters.uIdString,
				age: 0,
				sex: 1,
				manFlag: false, //展示男女
				tabs: ["正面", "侧面", "背面"], //tab切换
				tabNum: 0, //tab切换默认第一个
				dialogFlag: false, //遮盖层
				dialogTitle: '', //弹框标题
				manFlag: false, //男人
				manFrontFlag: false, //男正面flag
				manHeaderFalg: false, //男正面头部Flag
				manAbdomenFlag: false, //男正面腹部
				womanFlag: false, //女人
				womanFrontFlag: false, //女正面flag
				womanHeaderFalg: false, //女正面头部Flag
				womanAbdomenFlag: false, //女正面腹部
				childrenFlag: false, //儿童
				childrenFrontFlag: false, //儿童正面flag
				childrenHeaderFlag: false, //儿童正面头部Flag
				childrenAbdomenFlag: false, //儿童正面腹部
				iscur: "-1", //弹出层症状列表tab				
				rightSeletcd: "-1", //弹出层症状列表tab
				isThirdCur: "-1", //三层  第二层tab切换
				isfourCur: '-1',
				list: null,
				symptomList: [], //弹出层症状列表
				secondMenuFlag: false, //二级菜单是否展示
				leftNum: '-1', //左侧一级菜单
				leftSecondNum: '-1', //左侧二级级菜单
				symptomLeftList: null,
				rightList: [], //右侧选症状列表
				selectedPopnameList: [], //已选择的症状患用名称
				selectedTermList: [], //已选择的症状专用名称
			}
		},
		created() {
			
		},
		mounted(){
			this.patientInfo = JSON.parse(sessionStorage.getItem("patientInfo"));
			if(!this.patientInfo){
				this.patientInfo = this.selectedPatient();
			}
			this.getPatientInfo();
		},
		methods: {
			 // 使用对象展开运算符将 getter 混入 computed 对象中
            ...mapGetters('SelfDiagnosis',[  //SelfDiagnosis.js
                'selectedPatient'    //SelfDiagnosis.js ----getters ---  selectedPatient
            ]),
			//获取患者信息
			getPatientInfo() {
				//对应   mapGetters下面的selectedPatient方法    
				//this.patientInfo = this.selectedPatient();
				//console.log(this.patientInfo)
				let date = new Date;
				let currentYear = date.getFullYear();
				let birthYear = this.patientInfo.pBirth.substring(0, 4);
				let _age = currentYear - birthYear;
				if (_age > 14) {
					if (this.patientInfo.pSex == "男") {
						this.manFlag = true;
						this.manFrontFlag = true;
						this.sex = 1;
						this.age = 2;
						//获取成年男主症状
						this.list = this.$store.getters["SelfDiagnosis/manMainSymptoms"];
						if (this.list.length == 0) {
							this.getManMainSymptoms();
						}
						//获取成年男辅症状
						this.symptomLeftList = this.$store.getters["SelfDiagnosis/manAuxiliarySymptoms"];
						if (this.symptomLeftList.length == 0) {
							this.getManAuxiliarySymptoms();
						}
					} else { //女
						this.womanFlag = true;
						this.womanFrontFlag = true;
						this.sex = 0;
						this.age = 2;
						//获取成年女主症状
						this.list = this.$store.getters["SelfDiagnosis/womanMainSymptoms"];
						if (this.list.length == 0) {
							this.getWomanMainSymptoms();
						}
						//获取成年女辅症状
						this.symptomLeftList = this.$store.getters["SelfDiagnosis/womanAuxiliarySymptoms"];
						if (this.symptomLeftList.length == 0) {
							this.getWomanAuxiliarySymptoms();
						}
					}
				} else {
					//小孩男
					if (this.patientInfo.pSex == "男") {
						this.childrenFlag = true;
						this.childrenFrontFlag = true;
						this.sex = 1;
						this.age = 0;
						//获取男小孩主症状
						this.list = this.$store.getters["SelfDiagnosis/boyMainSymptoms"];
						if (this.list.length == 0) {
							this.getBoyMainSymptoms();
						}
						//获取男小孩辅症状
						this.symptomLeftList = this.$store.getters["SelfDiagnosis/boyAuxiliarySymptoms"];
						if (this.symptomLeftList.length == 0) {
							this.getBoyAuxiliarySymptoms();
						}
					}
					//小孩女
					if (this.patientInfo.pSex == "女") {
						this.childrenFlag = true;
						this.childrenFrontFlag = true;
						this.sex = 0;
						this.age = 0;
						//获取女小孩主症状
						this.list = this.$store.getters["SelfDiagnosis/girlMainSymptoms"];
						if (this.list.length == 0) {
							this.getGirlMainSymptoms();
						}
						//获取女小孩辅症状
						this.symptomLeftList = this.$store.getters["SelfDiagnosis/girlAuxiliarySymptoms"];
						if (this.symptomLeftList.length == 0) {
							this.getGirlAuxiliarySymptoms();
						}
					}
				}


			},
			//获取成年男主症状
			getManMainSymptoms() {
				//男人 sex:1 age:2
				//女人 sex:0 age:2
				//小孩 sex:2 age:1 这个有问题
				this.$post('symptom/gopartall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.list = res.data.body;
					this.$store.commit("SelfDiagnosis/updateManMainSymptoms", this.list)
				}).catch((err) => {

				})
			},
			//获取成年男辅症状
			getManAuxiliarySymptoms() {
				this.$post('symptom/goclassall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.symptomLeftList = res.data.body;
					this.$store.commit("SelfDiagnosis/updateManAuxiliarySymptoms", this.symptomLeftList)
				}).catch((err) => {

				})
			},
			//获取成年女主症状
			getWomanMainSymptoms() {
				//男人 sex:1 age:2
				//女人 sex:0 age:2
				//小孩 sex:2 age:1 这个有问题
				this.$post('symptom/gopartall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.list = res.data.body;
					this.$store.commit("SelfDiagnosis/updateWomanMainSymptoms", this.list)
				}).catch((err) => {

				})
			},
			//获取成年女辅症状
			getWomanAuxiliarySymptoms() {
				this.$post('symptom/goclassall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.symptomLeftList = res.data.body;
					this.$store.commit("SelfDiagnosis/updateWomanAuxiliarySymptoms", this.symptomLeftList)
				}).catch((err) => {

				})
			},
			//获取男小孩主症状
			getBoyMainSymptoms() {
				//男人 sex:1 age:2
				//女人 sex:0 age:2
				//小孩 sex:2 age:1 这个有问题
				this.$post('symptom/gopartall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.list = res.data.body;
					this.$store.commit("SelfDiagnosis/updateBoyMainSymptoms", this.list)
				}).catch((err) => {

				})
			},
			//获取男小孩辅症状
			getBoyAuxiliarySymptoms() {
				this.$post('symptom/goclassall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.symptomLeftList = res.data.body;
					this.$store.commit("SelfDiagnosis/updateBoyAuxiliarySymptoms", this.symptomLeftList)
				}).catch((err) => {

				})
			},
			//获取女小孩主症状
			getGirlMainSymptoms() {
				//男人 sex:1 age:2
				//女人 sex:0 age:2
				//小孩 sex:2 age:1 这个有问题
				this.$post('symptom/gopartall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.list = res.data.body;
					this.$store.commit("SelfDiagnosis/updateGirlMainSymptoms", this.list)
				}).catch((err) => {

				})
			},
			//获取女小孩辅症状
			getGirlAuxiliarySymptoms() {
				this.$post('symptom/goclassall', {
					"userId": this.userId,
					"uId": this.userId,
					"sex": this.sex,
					"age": this.age
				}).then(res => {
					this.symptomLeftList = res.data.body;
					this.$store.commit("SelfDiagnosis/updateGirlAuxiliarySymptoms", this.symptomLeftList)
				}).catch((err) => {

				})
			},
			//正面，侧面，背面tab切换
			tab(index) {
				this.tabNum = index;
			},
			//点击男正面头部
			showHeader() {
				this.manFrontFlag = !this.manFrontFlag;
				this.manHeaderFalg = !this.manHeaderFalg;
				//this.symptomList=this.filerSymptomByPart('头面部','头部')
			},
			//点击男正面腹部
			showAbdomen() {
				this.manFrontFlag = !this.manFrontFlag;
				this.manAbdomenFlag = !this.manAbdomenFlag;
			},
			//点击女正面头部
			showWomanHeader() {
				this.womanFrontFlag = !this.womanFrontFlag;
				this.womanHeaderFalg = !this.womanHeaderFalg;
			},
			//可以根据两级部位对症状过滤
			filerSymptomByPart(fistPart, secondPart) {
				let firstPart = this.list.filter(item => item.name == fistPart); //'头面部'
				if (secondPart) {
					return (firstPart[0].part1).filter(item => item.partNam == secondPart)[0].part2; //'头部'
				} else {
					return firstPart[0].part1[0].part2;
				}
			},
			//点击女正面腹部
			showWomanAbdomen() {
				this.womanFrontFlag = !this.womanFrontFlag;
				this.womanAbdomenFlag = !this.womanAbdomenFlag;
			},
			//点击儿童正面头部
			showChildrenHeader() {
				this.childrenFrontFlag = !this.childrenFrontFlag;
				this.childrenHeaderFlag = !this.childrenHeaderFlag;
			},
			//点击儿童正面腹部
			showChildrenAbdomen() {
				this.childrenFrontFlag = !this.childrenFrontFlag;
				this.childrenAbdomenFlag = !this.childrenAbdomenFlag;
			},
			//点击图像展示症状
			showSym(e) {
				this.dialogTitle = e.target.getAttribute('name');
				var firstName = e.target.getAttribute('firstName');
				var secondName = e.target.getAttribute('secondName');
				if (secondName) {
					this.symptomList = this.filerSymptomByPart(firstName, secondName);
				} else {
					this.symptomList = this.filerSymptomByPart(firstName);
				}
				this.dialogFlag = true;
			},
			//展示症状tab切换
			tabSymptomChange(index) {
				this.iscur = index;
				this.rightSeletcd = "-1";
			},
			//展示症状三层tab切换
			tabSymptomThirdChange(index, list) {
				this.isThirdCur = index;
				this.rightSeletcd = "-1";
				for (let i = 0; i < list.class2.length; i++) {
					list.class2[i].isActive = false
				}
			},
			//点击选择弹出框里面症状增加class
			addActive(index) {
				this.rightSeletcd = index;
			},
			addSelfActive(list, index) {
				this.isfourCur = index;
				//list.isActive = !list.isActive;
			},
			//男返回正面
			backFront() {
				this.manFrontFlag = !this.manFrontFlag;
				this.manHeaderFalg = false;
				this.manAbdomenFlag = false;
			},
			//女返回正面
			backwomanFront() {
				this.womanFrontFlag = !this.womanFrontFlag;
				this.womanHeaderFalg = false;
				this.womanAbdomenFlag = false;
			},
			//儿童返回正面
			backChildrenFront() {
				this.childrenFrontFlag = !this.childrenFrontFlag;
				this.childrenHeaderFlag = false;
				this.childrenAbdomenFlag = false;
			},
			close() {
				this.dialogFlag = false;
			},
			//症状选取，点击一级菜单，二级菜单展示
			secondMenuShow(index) {
				this.secondMenuFlag = true;
				this.leftNum = index;
			},
			//点击左侧俩次菜单展示右侧内容
			rightListShow(index) {
				this.leftSecondNum = index;
			},
			//点击右侧待选症状，加入已选症状
			addSelectedSympom(id, item, termname) {
				//患用名称
				let selectListPopnameObj = {
					symptomId: id,
					symptom: item
				}
				//专用名称
				let selectedTermListObj = {
					symptomId: id,
					symptom: termname
				}
				if(this.selectedPopnameList.length == 20){
					Toast({
						content: '大经中医：最多选择20条症状',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				for (var i = 0; i < this.selectedPopnameList.length; i++) {
					var symptomId = this.selectedPopnameList[i].symptomId;
					if (id == symptomId) {
						Toast({
							content: '大经中医：该症状已选择',
							position: 'bottom',
							duration: 1000
						});
						return false;
					}
				}
				this.selectedPopnameList.push(selectListPopnameObj);
				this.selectedTermList.push(selectedTermListObj);

			},
			//删除已选症状
			delSelected(index) {
				this.selectedPopnameList.splice(index, 1);
			},
			//点击下一步
			next() {
				const selectedLen = this.selectedPopnameList.length;
				if (selectedLen < 4) {
					Toast({
						content: '大经中医：至少选择四种症状',
						position: 'bottom',
						duration: 1000
					});
					return false;
				} else {
					let patient = this.$store.getters["SelfDiagnosis/selectedPatient"];
					//termname症状名称(专用名称):头胀,头痛,头晕 
					let pId = patient.pId; //患者Id 
					let termname = '';
					let popname = '';
					const selectedLen = this.selectedTermList.length;
					for (let i = 0; i < selectedLen; i++) {
						/* termname+=this.selectedTermList[i].symptomId+','; */
						termname += this.selectedTermList[i].symptom + ','
					}
					for (let j = 0; j < this.selectedPopnameList.length; j++) {

						popname += this.selectedPopnameList[j].symptom + ','
					}

					termname = termname.substring(0, termname.length - 1);
					popname = popname.substring(0, popname.length - 1);
					this.$post('patientSymptoms/uploadPatientsym', {
						"pId": pId,
						"termname": termname,
						"popname": popname,
					}).then(res => {
						if (res.data.code == 200) {
							const psid = res.data.data.psid;
							this.$router.push({
								path: '/diagnosticResults/diagnosticResults/' + psid
							});
						} else {
							const msg = res.data.msg;
							Toast({
								content: msg,
								position: 'bottom',
								duration: 1000
							});
						}
					}).catch((err) => {

					})
				}
			}
		},

	}
</script>

<style scoped="" lang="less">
	@import '../../../static/css/symptomSelect.css';
</style>

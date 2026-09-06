.PHONY: build test fmt check optimize deploy-testnet clean

WASM_TARGET = wasm32-unknown-unknown
WASM_OUT    = target/$(WASM_TARGET)/release/rent_reserve.wasm
FINAL_WASM  = target/rent_reserve.wasm

# ─── Build ───────────────────────────────────────────────────────────────────
build:
	cargo build --target $(WASM_TARGET) --release
	cp $(WASM_OUT) $(FINAL_WASM)
	@echo "✓ WASM written to $(FINAL_WASM)"
	@wc -c < $(FINAL_WASM) | xargs -I{} echo "  Size: {} bytes"

# ─── Test ────────────────────────────────────────────────────────────────────
test:
	cargo test -- --nocapture

# ─── Format ──────────────────────────────────────────────────────────────────
fmt:
	cargo fmt

# ─── Check (no codegen) ──────────────────────────────────────────────────────
check:
	cargo check --target $(WASM_TARGET)

# ─── Optimize (requires stellar CLI) ────────────────────────────────────────
optimize: build
	stellar contract optimize --wasm $(FINAL_WASM)
	@echo "✓ Optimized"

# ─── Deploy to testnet ───────────────────────────────────────────────────────
deploy-testnet: build
	@if [ -z "$(STELLAR_SECRET)" ]; then \
		echo "❌ Set STELLAR_SECRET=S..."; exit 1; \
	fi
	stellar contract deploy \
		--wasm $(FINAL_WASM) \
		--source $(STELLAR_SECRET) \
		--network testnet

# ─── Clean ───────────────────────────────────────────────────────────────────
clean:
	cargo clean

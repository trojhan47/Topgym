/**
 * Define interface for Token Model
 *
 * @author Kennedy Oseni <kennyose01@gmail.com>
 */

type tokenKind = "google" | "local";

export interface IToken {
	user: string;
	kind: tokenKind;
	code: string;
	secret?: string;
	createdAt?: Date;
	expiresAt: Date;
}

export default IToken;
